import { onUnmounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { checkItemExist, createCollection, getCollectionList, deleteItem, checkItemNotExist, getDetailData } from "@/lib/firebaseFn";
import { v7 as uuidv7 } from 'uuid';
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import { COLLECTION } from "@/lib/constants"
import { getLocalStorage, sendMessageToast, setLocalStorage } from "@/lib/utils";
import { auth } from '@/plugins/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



export const useAuthStore = defineStore('auth', () => {
    const users: Ref<any[]> = ref([]);
    const currentUser = ref((getLocalStorage('auth')))
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);
    type IForm = {
        email: string;
        firstName?: string;
        lastName?: string;
        password: string;
        role?: string
    };

    const errors = ref<{
        field: keyof IForm;
        mess: string;
    }>();


    async function signUp(payload: IForm) {
        try {
            loading.value = true;

            const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password)


            const user = userCredential.user;
            if (user) {
                const payloadVl = {
                    ...payload,
                    userId: user.uid,
                    displayName: `${payload.firstName} ${payload.lastName}`,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    providerData: user?.providerData,
                    role: payload?.role || 'Customer'
                }
                await createCollection(COLLECTION.USERS, payloadVl);
            }

            sendMessageToast('success', 'create', 'success')
        } catch (error: any) {
            sendMessageToast('fail', 'create', 'error', error.message)

        } finally {
            loading.value = false;
        }
    }

    async function login(payload: IForm) {
        try {
            loading.value = true;

            const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password)

            const user = userCredential.user;
            if (user) {
                const res = await getDetailData(COLLECTION.USERS, 'userId', user.uid);
                setLocalStorage('auth', res?.docs[0].data())
            }

        } catch (error: any) {
            sendMessageToast('fail', 'create', 'error', error.message)
        } finally {
            loading.value = false;
        }
    }
    async function getListUsers() {
        try {
            loading.value = true;
            unsubscribe.value = getCollectionList(COLLECTION.USERS, (data) => { users.value = data });
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }
    onUnmounted(() => {
        if (unsubscribe.value) {
            unsubscribe.value();
        }
    });


    return { loading, signUp, errors, getListUsers, users, login, currentUser }
})
