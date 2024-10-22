import * as z from 'zod';

import { defineStore, storeToRefs } from "pinia";

import { COLLECTION } from '@/lib/constants';
import { createCollection } from "@/lib/firebaseFn"
import type { orderServiceSchema } from '@/validations/order-service';
import { ref } from "vue";
import { toast } from 'vue-sonner';
import { useAuthStore } from '../index';
import { v7 as uuidv7 } from "uuid";

export const useOrderService = defineStore("orderService", () => {
    const loading = ref(false);
    const authStore = useAuthStore();
    const { currentUser } = storeToRefs(authStore);
    console.log('currentUser', currentUser)


    async function createServiceOrder(payload: z.infer<typeof orderServiceSchema>) {
        try {
            loading.value = true;
            console.log('payload',payload)
            const pl = {
                ...payload,
                petNum: payload.petNum[0],
                userId: currentUser ? currentUser.value.userId : "",
                services: payload.services.map((i) => {
                    return {
                        ...i,
                        duration: i?.duration?.[0] || 0
                    }
                }),
                orderCode: uuidv7() 
            }
            await createCollection(COLLECTION.ORDER_SERVICE, pl);
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






    return {
        loading,
        createServiceOrder
    }
})