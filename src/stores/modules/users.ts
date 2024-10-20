import { onUnmounted, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  checkItemExist,
  createCollection,
  getCollectionList,
  deleteItem,
  checkItemNotExist,
  getContainsAnyData,
  getContainsAnyDataPagination,
} from "@/lib/firebaseFn";
import { v7 as uuidv7 } from "uuid";
import { COLLECTION } from "@/lib/constants";
import { getIndex, sendMessageToast } from "@/lib/utils";
import type { IUser } from "@/types/user.type";

export const useUsers = defineStore("users", () => {
  const loading = ref(false);
  const pageCount = ref();
  const lastVisibleDoc = ref(null);
  const lastVisibleDocsCache = ref<Record<number, any>>({});
  const users: Ref<any[]> = ref([]);

  // async function getListUser({
  //   pageData,
  //   isAll,
  //   role,
  //   condition,
  // }: {
  //   pageData: {
  //     pageIndex: number;
  //     pageSize: number;
  //   };
  //   isAll: boolean;
  //   role: string;
  //   condition: any;
  // }) {
  //   try {
  //     loading.value = true;
  //     await
  //   } catch (err) {
  //     console.log("error");
  //   } finally {
  //     loading.value = false;
  //   }
  // }

  async function getListUser({
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
      await getContainsAnyDataPagination({
        callback: ({ data, totalRecord, lastVisibleDoc: lastDoc }) => {
          users.value = data?.map((i, j) => {
            return {
              ...i,
              index: getIndex({
                dataPage: { page: pageIndex, page_size: pageSize },
                index: j,
              }),
            };
          });
        },
        collectionName: COLLECTION.USERS,
        isAll: false,
        limitNumb: pageSize,
        startAfterDoc: lastVisibleDocForPage,
        conditions:[
          {
            fieldId:'role', dataSearch:[null],
          }
        ]
      });
    } catch (error) {
      loading.value = false;
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
  async function createNewUser(payload: IUser) {
    try {
      loading.value = true;
      let checkPhone;
      const checkEmail = await checkItemExist(
        COLLECTION.USERS,
        "email",
        payload.email
      );
      const checkUsername = await checkItemExist(
        COLLECTION.USERS,
        "displayName",
        payload.displayName
      );
      if (payload.phoneNumber) {
        checkPhone = await checkItemExist(
          COLLECTION.USERS,
          "phoneNumber",
          payload.phoneNumber
        );
      } else {
        checkPhone = true;
      }
      if (checkEmail && checkUsername && checkPhone) {
        const totalRecord = await createCollection(COLLECTION.USERS, {
          ...payload,
          uid: uuidv7(),
        });
        pageCount.value = totalRecord;
        sendMessageToast("success", "create", "success");
      }
    } catch (error: any) {
      console.log("err", error);
      sendMessageToast("fail", "create", "error", error.message);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    users,
    getListUser,
    createNewUser,
  };
});
