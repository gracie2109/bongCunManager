<template>
  <PageTitle />

  <ContentWrap>
    <div class="container bg-white h-auto w-auto mt-3 min-h-dvh">
      <div class="text-center mx-auto py-6">
        <h1 class="font-bold text-2xl">Setting pet service price</h1>
        <span class="text-center"></span>
      </div>
      <div>
        <ServicePriceTable :isHandleForm="isHandleForm" />
      </div>
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import ContentWrap from "@/views/admin/components/ContentWrap.vue";
import PageTitle from "@/views/admin/pets/PageTitle.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import ServicePriceTable from "./components/ServicePriceTable.vue";
import { getDetailData } from "@/lib/firebaseFn";
import { COLLECTION } from "@/lib/constants";

const route = useRoute();
const serviceInfo = ref();
const isHandleForm = computed(() => {
  if (serviceInfo?.value) {
    if (serviceInfo?.value?.petIds?.includes(String(route.params.petId))) {
      return true;
    }
    return false;
  } else return false;
});

onMounted(async () => {
  if (route.name === "DetailPetService" && route.params.serviceId) {
    const service = await getDetailData(
      COLLECTION.PETS_SERVICES,
      "__name__",
      String(route.params.serviceId)
    );
    if (!service.empty) {
      serviceInfo.value = service.docs[0].data();
    }
  }
});
</script>
