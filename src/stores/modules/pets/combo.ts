import { COLLECTION } from "@/lib/constants";
import {
  checkItemExist,
  checkItemNotExist,
  createCollection,
  deleteItem,
  getCollectionList,
} from "@/lib/firebaseFn";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { v7 as uuidv7 } from "uuid";
import { getIndex, sendMessageToast } from "@/lib/utils";

export const usePetCombo = defineStore("petCombo", () => {
  const loading = ref(false);
  const pageCount = ref();
  const lastVisibleDoc = ref(null);
  const lastVisibleDocsCache = ref<Record<number, any>>({});

  const listCombo: Ref<any[]> = ref([]);

  async function createNewPetCombo(payload: any) {
    try {
      console.log("paykiad", payload);
      loading.value = true;
      const notExist = await checkItemExist(
        COLLECTION.PET_SERVICES_COMBO,
        "name",
        payload.name
      );
      if (notExist) {
        const totalRecord = await createCollection(
          COLLECTION.PET_SERVICES_COMBO,
          {
            ...payload,
            uid: uuidv7(),
          }
        );
        pageCount.value = totalRecord.data;
        sendMessageToast("success", "create", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "create", "error", error.message);
    } finally {
      loading.value = false;
    }
  }

  async function getListPetCombo({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) {
    loading.value = true;
    try {
      let lastVisibleDocForPage = null;

      if (pageIndex > 1) {
        lastVisibleDocForPage = lastVisibleDocsCache.value[pageIndex - 1];
      }
      await getCollectionList({
        collectionName: COLLECTION.PET_SERVICES_COMBO,
        callback({ data, totalRecord, lastVisibleDoc: lastDoc }) {
          listCombo.value = data?.map((i, j) => {
            return {
              ...i,
              index: getIndex({
                dataPage: { page: pageIndex, page_size: pageSize },
                index: j,
              }),
            };
          });
          pageCount.value = totalRecord;
          lastVisibleDoc.value = lastDoc;
          lastVisibleDocsCache.value[pageIndex] = lastDoc;
          loading.value = false;
        },
        isAll: false,
        limitNumb: pageSize,
        startAfterDoc: lastVisibleDocForPage,
      });
    } catch (error) {
      loading.value = false;
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  async function deleteServiceCombo(id: string) {
    try {
      loading.value = true;
      const exist = await checkItemNotExist(COLLECTION.PET_SERVICES_COMBO, "__name__", id);
      if (exist) {
        const totalRecord = await deleteItem(COLLECTION.PET_SERVICES_COMBO, id);
        pageCount.value = totalRecord;
        sendMessageToast("success", "delete", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    listCombo,
    pageCount,
    createNewPetCombo,
    getListPetCombo,
    deleteServiceCombo
  };
});
