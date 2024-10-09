<template>
  <PageTitle />

  <ContentWrap>
    <div class="fixed top-[3.75rem] h-auto overflow-y-auto bg-white w-[93vw]">
      <div class="w-full min-h-dvh space-y-6 ml-2 p-3">
        <div class="service-card grid grid-cols-6 gap-4">
          <div
            class="border border-primary h-[100px] rounded-lg"
            id="create_btn"
          >
            <ModalCreateService />
          </div>
          <div v-for="(i, j) in petServices">
            <ServiceCard
              :data="i"
              :key="j"
              :enable="String($route.params.petId)"
              :isMouseId="isMouseId"
              @set-mouse-el="handleMouseEv"
            />
          </div>
        </div>

        <div
          class="w-full h-auto overflow-y-auto overflow-x-auto"
          v-if="petServices.length > 0"
        >
          <div class="w-full h-full" id="short_cut_service">
            <ListServicesPriceTable
              :services="petServices"
              :isMouseId="isMouseId"
              @set-mouse-el="handleMouseEv"
            />
          </div>
        </div>
      </div>
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import { usePetServices } from "@/stores";
import { ContentWrap } from "@/views/admin/components";
import PageTitle from "../PageTitle.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import ServiceCard from "../services/components/ServiceCard.vue";
import ListServicesPriceTable from "./components/ListServicesPriceTable.vue";
import ModalCreateService from "../components/ModalCreateService.vue";

const store = usePetServices();
const { petServices, loading } = storeToRefs(store);

const isMouseId = ref("");

const handleMouseEv = (value: string) => {
  isMouseId.value = value;
};

onMounted(async () => {
  await store.getListPetService({ pageIndex: 1, pageSize: 500 });
});
</script>
