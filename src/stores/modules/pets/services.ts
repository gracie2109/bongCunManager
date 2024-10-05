import { onUnmounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { checkItemExist, createCollection, getCollectionList, deleteItem, checkItemNotExist } from "@/lib/firebaseFn";
import { v7 as uuidv7 } from 'uuid';
import { COLLECTION } from "@/lib/constants"
import { sendMessageToast } from "@/lib/utils";

export const usePetServices = defineStore('petServices', () => {
    const petServices: Ref<any[]> = ref([]);
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);
    const pageCount = ref();
    const lastVisibleDoc = ref(null);
    const lastVisibleDocsCache = ref<Record<number, any>>({});


    async function createNewPetService(payload: any) {
        try {
            loading.value = true;
            const notExist = await checkItemExist(COLLECTION.PETS_SERVICES, 'name', payload.name);
            if (notExist) {
                const totalRecord = await createCollection(COLLECTION.PETS_SERVICES, { ...payload, uid: uuidv7() });
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

    async function getListPetService({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }) {
        loading.value = true;
        try {
            let lastVisibleDocForPage = null;

            if (pageIndex > 1) {
                lastVisibleDocForPage = lastVisibleDocsCache.value[pageIndex - 1];
            }

            await getCollectionList(
                COLLECTION.PETS_SERVICES,
                ({ data, totalRecord, lastVisibleDoc: lastDoc }) => {
                    petServices.value = data?.map((i, j) => {
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


    async function deletePetService(id: string) {
        try {
            loading.value = true;
            const exist = await checkItemNotExist(COLLECTION.PETS_SERVICES, '__name__', id);
            if (exist) {
                 const totalRecord = await deleteItem(COLLECTION.PETS_SERVICES, id);
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

    return { petServices, loading, pageCount, lastVisibleDoc, createNewPetService, getListPetService, deletePetService }
})
