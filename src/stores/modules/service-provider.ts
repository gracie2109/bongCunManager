import { onUnmounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { checkItemExist, createCollection, getCollectionList, deleteItem, checkItemNotExist } from "@/lib/firebaseFn";
import { v7 as uuidv7 } from 'uuid';
import { toast } from "vue-sonner";
import { useI18n } from "vue-i18n";
import { COLLECTION } from "@/lib/constants"
import { sendMessageToast } from "@/lib/utils";

export const useServiceProvider = defineStore('serviceProvider', () => {
    const providers: Ref<any[]> = ref([]);
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);

    async function createProvider(payload: any) {
        try {
            loading.value = true;
            const notExist = await checkItemExist(COLLECTION.PROVIDERS, 'name', payload.name);
            if (notExist) {
                await createCollection(COLLECTION.PROVIDERS, { ...payload, uid: uuidv7() });
                sendMessageToast('success', 'create', 'success')
            }
        } catch (error: any) {
            sendMessageToast('fail', 'create', 'error', error.message)

        } finally {
            loading.value = false;
        }
    }

    async function getListServiceProvider() {
        try {
            loading.value = true;
            unsubscribe.value = getCollectionList(COLLECTION.PROVIDERS, (data) => { providers.value = data });
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }

    async function deleteServiceProvider(id: string) {
        try {
            loading.value = true;
            const exist = await checkItemNotExist(COLLECTION.PROVIDERS, '__name__', id);
            if (exist) {
                await deleteItem(COLLECTION.PROVIDERS, id);
                sendMessageToast('success', 'delete', 'success');
            }
        }
        catch (error: any) {
            sendMessageToast('fail', 'delete', 'error', error.message)
        }
        finally {
            loading.value = false
        }
    }

    onUnmounted(() => {
        if (unsubscribe.value) {
            unsubscribe.value();
        }
    });


    return { providers, loading, createProvider, getListServiceProvider, deleteServiceProvider }
})
