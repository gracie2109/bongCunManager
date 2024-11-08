import * as z from "zod";

import {
  createCollection,
  getContainsAnyDataPagination,
  getDetailData,
  type QueryCondition,
  getCollectionList,
} from "@/lib/firebaseFn";
import { defineStore, storeToRefs } from "pinia";

import { COLLECTION } from "@/lib/constants";
import type { orderServiceSchema } from "@/validations/order-service";
import { onMounted, ref, type Ref } from "vue";
import { status } from "@/data/order-services-status.json";
import { toast } from "vue-sonner";
import { useAuthStore } from "../index";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";

export const useOrderService = defineStore("orderService", () => {
  const loading = ref(false);
  const authStore = useAuthStore();
  const { currentUser } = storeToRefs(authStore);
  const lastVisibleDocsCache = ref<Record<number, any>>({});
  const searchOrderService: Ref<any[]> = ref([]);
  const lastVisibleDoc = ref(null);
  const searchTotalPage = ref(0);

  async function createSingleOrderService(
    payload: z.infer<typeof orderServiceSchema>
  ) {
    try {
      loading.value = true;
      const responses = await Promise.all(
        payload.services.map(async (i) => {
          const response = await createCollection(
            COLLECTION.ORDER_SERVICES_SERVICE,
            {
              ...i,
              userId: currentUser.value ? currentUser.value.userId : "",
              status: status[0]["value"],
              userInfo: {
                name: payload.name,
                phoneNumber: payload.phoneNumber,
              },
              isCancel: false,
              isMovingTime: false,
              cancel: {
                cancelDate: null,
                cancelBy: null,
                reason: "",
              },
              changesTime: {
                changesBy: null,
                fromTime: payload.time,
                toTime: null,
              },
            }
          );
          const res = response.response;
          return res.id;
        })
      );
      return responses;
    } catch (err: any) {
      console.log("err", err);
      toast.success("Order Service fail!");
    } finally {
      loading.value = false;
    }
  }

  async function createServiceOrder(
    payload: z.infer<typeof orderServiceSchema>
  ) {
    try {
      loading.value = true;
      const response = await createSingleOrderService(payload);
      const newPl = response?.map((i, j) => {
        return {
          order_service_id: i,
          status: status[0]["value"],
        };
      });
      await createCollection(COLLECTION.ORDER_SERVICES, {
        ...payload,
        order_service: newPl,
      });
      toast.success("Order Service success, please check mail !");
    } catch (err: any) {
      console.log("err", err);
      toast.success("Order Service fail!");
    } finally {
      loading.value = false;
    }
  }

  async function searchServiceOrder({
    pageSize,
    pageIndex,
    dataSearch,
  }: {
    pageSize: number;
    pageIndex: number;
    dataSearch: QueryCondition[];
  }) {
    try {
      loading.value = true;
      let lastVisibleDocForPage = null;
      console.log("dataSearch", dataSearch);
      if (pageIndex > 1) {
        lastVisibleDocForPage = lastVisibleDocsCache.value[pageIndex - 1];
      }
      await getContainsAnyDataPagination({
        collectionName: COLLECTION.ORDER_SERVICES,
        limitNumb: pageSize,
        startAfterDoc: lastVisibleDocForPage,
        callback({ data, totalRecord, lastVisibleDoc: lastDoc }) {
          searchOrderService.value = data;
          lastVisibleDoc.value = lastDoc;
          searchTotalPage.value = data.length || 0;
        },
        conditions: dataSearch || [],
      });
    } catch (err: any) {
      console.log("err", err.message);
    } finally {
      loading.value = false;
    }
  }
  async function queryGetListCollection({
    collectionName,
  }: {
    collectionName: string;
  }) {
    let listCombo: any[] = [];
    const docRef = collection(db, collectionName);
    const docSnap = await getDocs(docRef);
    if (!docSnap.empty && docSnap.size > 0) {
      docSnap.forEach((i) => {
        listCombo.push({
          ...i.data(),
          id: i.id,
        });
      });
    }
    return listCombo;
  }

  async function getDetailServiceOrder(orderId: string) {
    try {
      loading.value = true;
      if (!orderId) {
        throw new Error("Missing params");
      }
      let selected: any = null;
      const snapshot = await getDetailData(
        COLLECTION.ORDER_SERVICES,
        "__name__",
        orderId
      );
      if (!snapshot.empty) {
        selected = {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        };
      }
      if (selected && Array.isArray(selected.services)) {
        const comboOrder = selected.services.filter(
          (i: any) => i?.type === "combo"
        );
        const notComboOrder = selected.services.filter(
          (i: any) => i?.type !== "combo"
        );

        const services: any[] = [];

        if (comboOrder.length > 0) {
          const listCombo = await queryGetListCollection({
            collectionName: COLLECTION.PET_SERVICES_COMBO,
          });
          if (listCombo) {
            const comboServices = comboOrder
              .map((combo: any) => {
                const matchedItem = listCombo.find(
                  (itemA: any) => itemA.id === combo.id
                );
                return matchedItem ? { ...matchedItem } : null;
              })
              .filter((item: any) => item !== null);

            services.push(...comboServices);
          }
        }
        if (notComboOrder.length > 0) {
          const listServices = await queryGetListCollection({
            collectionName: COLLECTION.PETS_SERVICES,
          });
          if (listServices) {
            const individualServices = notComboOrder
              .map((service: any) => {
                const matchedItem = listServices.find(
                  (itemA: any) => itemA.id === service.id
                );
                return matchedItem ? { ...matchedItem } : null;
              })
              .filter((item: any) => item !== null);

            services.push(...individualServices);
          }
        }
        
        selected = {
          ...selected,
          services,
        };
      }
      return selected;
    } catch (err: any) {
      console.log("err", err.message);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    searchOrderService,
    searchTotalPage,
    createServiceOrder,
    searchServiceOrder,
    getDetailServiceOrder,
  };
});
