import { onUnmounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { checkItemExist, createCollection, getCollectionList, deleteItem, checkItemNotExist } from "@/lib/firebaseFn";
import { v7 as uuidv7 } from 'uuid';
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import { COLLECTION } from "@/lib/constants"
import { sendMessageToast } from "@/lib/utils";
import { auth } from '@/plugins/firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



export const useAuthStore = defineStore('auth', () => {
    const users: Ref<any[]> = ref([]);
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);
    type IForm = {
        email: string;
        firstName: string;
        lastName: string;
        passWord: string;
    };

    const errors = ref<{
        field: keyof IForm;
        mess: string;
    }>();

   
    const saveUser = ref()
    async function signUp(payload: IForm) {
        try {
            loading.value = true;
          
            const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.passWord)

            const user = userCredential.user;
            if (user) {
                const payloadVl = {
                    ...payload,
                    userId: user.uid,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    phoneNumber:user.phoneNumber
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


    console.log('save', saveUser)
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


    return { loading, signUp, errors, getListUsers, users }
})
