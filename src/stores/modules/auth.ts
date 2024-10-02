import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { createCollection, getCollectionList, getDetailData } from "@/lib/firebaseFn";
import { COLLECTION, DEFAULT_ROLE } from "@/lib/constants"
import { getLocalStorage, removeStorage, sendMessageToast, setLocalStorage } from "@/lib/utils";
import { auth } from '@/plugins/firebase'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail, confirmPasswordReset,
    type Auth, verifyPasswordResetCode, applyActionCode, onAuthStateChanged, updateProfile, signOut


} from "firebase/auth";
import type { IUser, ILoginPayload, IRegisterPayload } from "@/types/user.type";
import { toast } from 'vue-sonner';
import { FirebaseError } from 'firebase/app';
import { useRoute, useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const users: Ref<IUser[]> = ref([]);
    const currentUser = ref<IUser>(JSON.parse(getLocalStorage('auth')))
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);
    const isSuccess = ref(false);
    const route = useRoute()
    const router = useRouter();
    const pageCount = ref()

    async function signUp(payload: IRegisterPayload | IUser) {
        loading.value = true;
        await createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    const payloadVl = {
                        ...payload,
                        password: null,
                        userId: user.uid,
                        emailVerified: user.emailVerified,
                        photoURL: user.photoURL,
                        phoneNumber: user.phoneNumber,
                        providerData: user?.providerData,
                        role: null
                    }
                    await createCollection(COLLECTION.USERS, payloadVl);
                    isSuccess.value = true
                }

                sendMessageToast('success', 'create', 'success')
            })
            .catch((error) => {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email already exists.')
                        toast.error('Email already exists.');
                    } else if (error.code === 'auth/weak-password') {
                        toast.error('Password should be at least 6 characters.')
                    } else {
                        toast.error(error.message)
                    }
                } else if (error instanceof Error) {
                    toast.error(error.message)
                }
                isSuccess.value = false
            })
            .finally(() => {
                loading.value = false;
            })

    }

    async function login(payload: ILoginPayload) {
        loading.value = true;
        await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    const res = await getDetailData(COLLECTION.USERS, 'userId', user.uid);
                    setLocalStorage('auth', res?.docs[0].data());

                }
                isSuccess.value = true
            })
            .catch((error) => {
                if (error instanceof FirebaseError) {
                    if (error.code === 'auth/invalid-credential') {
                        toast.error('Email or password is incorrect.')
                    } else if (error.code === 'auth/user-not-found') {
                        toast.error('User not found.')
                    } else {
                        toast.error(error.message)
                    }
                } else if (error instanceof Error) {
                    toast.error(error.message)
                }
                isSuccess.value = false
            })
            .finally(() => {
                loading.value = false;
            })
    }
    async function getListUsers() {
        try {
            loading.value = true;
            // unsubscribe.value = getCollectionList(COLLECTION.USERS, ({data,  totalRecord}) => { 
            //     users.value = data;
            //     pageCount.value = totalRecord
            //  });
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }

    async function sendResetPassMail(email: string) {
        loading.value = true;
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                isSuccess.value = true;
                sendMessageToast('success', 'create', 'success')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('send fauk', errorCode, errorMessage)
            })
            .finally(() => {
                loading.value = false
            })
    }

    async function updatePassHdl(password: string) {


        //    await confirmPasswordReset(FIREBASE_USER, password).then(() => {
        //         console.log('sendPasswSuccess')
        //         // Update successful.
        //       }).catch((error) => {
        //         console.log('error',error)
        //         // An error ocurred
        //         // ...
        //       });

        console.log('adad', password)

    }


    function signoutHdl() {
        removeStorage([]);
        signOut(auth)
        if (route.fullPath?.includes('admin')) {
            setTimeout(() => router.push('/'), 1000)
        } else {
            router.go(0)
        }
        toast.success('Logout success!')
    }

    return { loading, updatePassHdl, signUp, getListUsers, sendResetPassMail, users, login, currentUser, isSuccess, signoutHdl }
})
