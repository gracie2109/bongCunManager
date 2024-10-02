import { onUnmounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { checkItemExist, createCollection, getCollectionList, deleteItem, checkItemNotExist } from "@/lib/firebaseFn";
import { v7 as uuidv7 } from 'uuid';
import { COLLECTION } from "@/lib/constants"
import { sendMessageToast } from "@/lib/utils";

export const useServiceProvider = defineStore('serviceProvider', () => {
    const providers: Ref<any[]> = ref([]);
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);
    const pageCount = ref();
    const lastVisibleDoc = ref(null);
    const lastVisibleDocsCache = ref<Record<number, any>>({});


    async function createProvider(payload: any) {
        try {
            loading.value = true;
            const notExist = await checkItemExist(COLLECTION.PROVIDERS, 'name', payload.name);
            if (notExist) {
                const totalRecord = await createCollection(COLLECTION.PROVIDERS, { ...payload, uid: uuidv7() });
                pageCount.value = totalRecord
                sendMessageToast('success', 'create', 'success')
            }
        } catch (error: any) {
            sendMessageToast('fail', 'create', 'error', error.message)

        } finally {
            loading.value = false;
        }
    }

    const getIndex = ({ dataPage, index }: { index: number, dataPage: { page: number, page_size: number } }) => {
        const stt = (dataPage.page - 1) * dataPage.page_size + index + 1;
        return stt;
    };

    async function getListServiceProvider({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) {
        loading.value = true;
        try {
            let lastVisibleDocForPage = null;

            if (pageIndex > 1) {
                lastVisibleDocForPage = lastVisibleDocsCache.value[pageIndex - 1];
            }

            await getCollectionList(
                COLLECTION.PROVIDERS,
                ({ data, totalRecord, lastVisibleDoc: lastDoc }) => {
                    providers.value = data?.map((i, j) => {
                        return {
                            ...i,
                            index: getIndex({dataPage:{page: pageIndex, page_size:pageSize}, index: j})
                        }
                    });
                    pageCount.value = totalRecord;
                    lastVisibleDoc.value = lastDoc;
                    lastVisibleDocsCache.value[pageIndex] = lastDoc;
                    loading.value = false;
                },
                false,
                pageSize,
                lastVisibleDocForPage
            );
        } catch (error) {
            loading.value = false;
            console.error(error);
        }
        finally {
            loading.value = false;
        }
    }


    async function deleteServiceProvider(id: string) {
        try {
            loading.value = true;
            const exist = await checkItemNotExist(COLLECTION.PROVIDERS, '__name__', id);
            if (exist) {
                 const totalRecord = await deleteItem(COLLECTION.PROVIDERS, id);
                 pageCount.value = totalRecord
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

    return { providers, loading, pageCount, lastVisibleDoc, createProvider, getListServiceProvider, deleteServiceProvider }
})
