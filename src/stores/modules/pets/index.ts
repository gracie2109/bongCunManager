import { onUnmounted, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  checkItemExist,
  createCollection,
  getCollectionList,
  deleteItem,
  checkItemNotExist,
  updateCollection,
} from "@/lib/firebaseFn";
import { v7 as uuidv7 } from "uuid";
import { COLLECTION } from "@/lib/constants";
import { getIndex, sendMessageToast } from "@/lib/utils";

export const usePets = defineStore("pets", () => {
  const pets: Ref<any[]> = ref([]);
  const loading = ref(false);
  const unsubscribe = ref<null | (() => void)>(null);
  const pageCount = ref();
  const lastVisibleDoc = ref(null);
  const lastVisibleDocsCache = ref<Record<number, any>>({});

  async function createNewPet(payload: any) {
    try {
      loading.value = true;
      const notExist = await checkItemExist(
        COLLECTION.PETS,
        "name",
        payload.name
      );
      if (notExist) {
        const totalRecord = await createCollection(COLLECTION.PETS, {
          ...payload,
          uid: uuidv7(),
        });
        pageCount.value = totalRecord;
        sendMessageToast("success", "create", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "create", "error", error.message);
    } finally {
      loading.value = false;
    }
  }
  async function updatePet(payload: any) {
      try {
        loading.value = true;
      
        const totalRecord = await updateCollection(
          COLLECTION.PETS,
          payload.id,
          {
            ...payload,
          }
        );
        pageCount.value = totalRecord;
        sendMessageToast("success", "create", "success");
        // }
      } catch (error: any) {
        sendMessageToast("fail", "create", "error", error.message);
      } finally {
        loading.value = false;
      }
    }
  async function getListPets({
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
        callback: ({ data, totalRecord, lastVisibleDoc: lastDoc }) => {
          pets.value = data?.map((i, j) => {
            return {
              ...i,
              index: getIndex({
                dataPage: { page: pageIndex, page_size: pageSize },
                index: j,
              }),
            };
          });
        },
        collectionName: COLLECTION.PETS,
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

  async function deleteServiceProvider(id: string) {
    try {
      loading.value = true;
      const exist = await checkItemNotExist(COLLECTION.PETS, "__name__", id);
      if (exist) {
        const totalRecord = await deleteItem(COLLECTION.PETS, id);
        pageCount.value = totalRecord;
        sendMessageToast("success", "delete", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  }

  onUnmounted(() => {
    if (unsubscribe.value) {
      unsubscribe.value();
    }
  });

  return {
    pets,
    loading,
    pageCount,
    lastVisibleDoc,
    createNewPet,
    updatePet,
    getListPets,
    deleteServiceProvider,
  };
});
