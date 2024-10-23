import * as z from 'zod';

import { createCollection, getContainsAnyDataPagination, type QueryCondition } from "@/lib/firebaseFn"
import { defineStore, storeToRefs } from "pinia";

import { COLLECTION } from '@/lib/constants';
import type { orderServiceSchema } from '@/validations/order-service';
import { ref, type Ref } from "vue";
import { status } from "@/data/order-services-status.json"
import { toast } from 'vue-sonner';
import { useAuthStore } from '../index';

export const useOrderService = defineStore("orderService", () => {
    const loading = ref(false);
    const authStore = useAuthStore();
    const { currentUser } = storeToRefs(authStore);
    const lastVisibleDocsCache = ref<Record<number, any>>({});
    const searchOrderService: Ref<any[]> = ref([])
    const lastVisibleDoc = ref(null);
    const searchTotalPage = ref(0)

    async function createSingleOrderService(payload: z.infer<typeof orderServiceSchema>) {
        try {
            loading.value = true;
            const responses = await Promise.all(payload.services.map(async (i) => {
                const response = await createCollection(COLLECTION.ORDER_SERVICES_SERVICE, {
                    ...i,
                    userId: currentUser.value ? currentUser.value.userId : "",
                    status: status[0]['value'],
                    userInfo: {
                        name: payload.name,
                        phoneNumber: payload.phoneNumber
                    },
                    isCancel: false,
                    isMovingTime: false,
                    cancel: {
                        cancelDate: null,
                        cancelBy: null,
                        reason: ''
                    },
                    changesTime: {
                        changesBy: null,
                        fromTime: payload.time,
                        toTime: null
                    }
                });
                const res = response.response;
                return res.id
            }));
            return responses;
        } catch (err: any) {
            console.log('err', err);
            toast.success('Order Service fail!');
        } finally {
            loading.value = false;
        }
    }

    async function createServiceOrder(payload: z.infer<typeof orderServiceSchema>) {
        try {
            loading.value = true;
            const response = await createSingleOrderService(payload);
            const newPl = response?.map((i, j) => {
                return {
                    order_service_id: i,
                    status: status[0]['value'],
                }
            })
            await createCollection(COLLECTION.ORDER_SERVICES, { ...payload, order_service: newPl });
            toast.success('Order Service success, please check mail !')

        }
        catch (err: any) {
            console.log('err', err);
            toast.success('Order Service fail!')
        }
        finally {
            loading.value = false
        }
    }

    async function searchServiceOrder({ pageSize, pageIndex, dataSearch }: { pageSize: number, pageIndex: number, dataSearch:QueryCondition[]; }) {
        try {
            loading.value = true;
            let lastVisibleDocForPage = null;

            if (pageIndex > 1) {
                lastVisibleDocForPage = lastVisibleDocsCache.value[pageIndex - 1];
            }
     
            await getContainsAnyDataPagination({
                collectionName: COLLECTION.ORDER_SERVICES,
                limitNumb: pageSize,
                startAfterDoc: lastVisibleDocForPage,
                callback({ data, totalRecord, lastVisibleDoc: lastDoc, }) {
                    searchOrderService.value = data;
                    lastVisibleDoc.value = lastDoc;
                    searchTotalPage.value = data.length || 0;
                },
                conditions: dataSearch ||  []
            })
        }
        catch (err: any) {
            console.log('err', err.message)
        }
        finally {
            loading.value = false
        }
    }

    return {
        loading,
        searchOrderService,
        searchTotalPage,
        createServiceOrder,
        searchServiceOrder
    }
})