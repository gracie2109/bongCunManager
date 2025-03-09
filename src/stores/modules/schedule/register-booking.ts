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
import type { registerFormSchema } from "@/validations/register";
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

export const useBookingService = defineStore("bookingService", () => {
  const loading = ref(false);
  const authStore = useAuthStore();
  const { currentUser } = storeToRefs(authStore);

  async function registerBooking(
    payload: z.infer<typeof registerFormSchema>,
    callback?: (e?: any) => void,
    callbackError?: (e?: any) => void
  ) {
    try {
      loading.value = true;
      const newPayload = {
        ...payload,
        userId: currentUser.value ? currentUser.value.userId : "",
        status: status[0]["value"],
        userInfo: {
          name: payload.name,
          phone_number: payload.phone_number,
          email: payload.email,
        },
        isCancel: false,
        isMovingTime: false,
        cancel: {
          cancelDate: null,
          cancelBy: null,
          reason: "",
        },
        confirmTime: {
          changesBy: null,
          fromTime: payload.time,
          toTime: null,
        },
      };
      
      const response = await createCollection(COLLECTION.REGISTER_BOOKING, {...newPayload});
      const res = response.response;
  
      toast.success("Order Service success!");
      if(callback){
        callback()
      }
      return res.id;
      
    } catch (err) {
      loading.value = false;
      toast.error("Order Service fail!");
      if(callbackError){
        callbackError()
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    registerBooking,
  };
});
