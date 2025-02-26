import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  createCollection,
  getCollectionList,
  getDetailData
} from "@/lib/firebaseFn";
import { COLLECTION, DEFAULT_ROLE } from "@/lib/constants";
import { sendMessageToast } from "@/lib/utils";

import { toast } from "vue-sonner";
import { FirebaseError } from "firebase/app";
import { useRoute, useRouter } from "vue-router";

export const useBannersStore = defineStore("banners", () => {
  const products: Ref<any[]> = ref([]);
  const loading = ref(false);
  const pageCount = ref();

  async function createBanner(payload: any) {
    try {
      loading.value = true;
      await createCollection(COLLECTION.BANNERS, payload);
    } catch (error: any) {
      sendMessageToast("fail", "create", "error", error.message);
    } finally {
      loading.value = false;
    }
  }
  async function getListBannerHome() {
    try {
      loading.value = true;
    } catch (error: any) {
      sendMessageToast("fail", "get", "error", error.message);
    } finally {
      loading.value = false;
    }
  }

  return { products, loading, pageCount, createBanner, getListBannerHome };
});
