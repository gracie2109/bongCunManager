<template>
  <PageTitle />

  <ContentWrap>

    <SubMenu />

    <div class="relative top-20 h-auto overflow-y-auto bg-white w-[93vw]">
      <div class="w-full min-h-dvh space-y-6 ml-2 p-3">
        <div class="service-card grid grid-cols-6 gap-4">
          <div
            class="border border-primary h-[100px] rounded-lg"
            id="create_btn"
          >
            <ModalCreateService :default-pet="petInfo" />
          </div>
          <div
            v-if="!_.isEmpty(petServices) && !loading"
            v-for="(i, j) in petServices.filter((i) =>
              i?.petIds?.includes(params?.petId)
            )"
          >
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
              :services="petServices.filter((i) => i.petIds.includes(params?.petId))"
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
import { usePetServices, usePets } from "@/stores";
import { ContentWrap } from "@/views/admin/components";
import PageTitle from "../PageTitle.vue";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import ServiceCard from "../services/components/ServiceCard.vue";
import ListServicesPriceTable from "./components/ListServicesPriceTable.vue";
import ModalCreateService from "../components/ModalCreateService.vue";
import SubMenu from "../components/SubMenu.vue";
import { useRoute } from "vue-router";
import _ from "lodash"
const store = usePetServices();
const petStore = usePets();
const { petServices, loading } = storeToRefs(store);

const petInfo = ref()
const isMouseId = ref("");
const { params } = useRoute();
const handleMouseEv = (value: string) => {
  isMouseId.value = value;
};

onMounted(async () => {
  await store.getListPetService({ pageIndex: 1, pageSize: 500 });
  const data= await petStore.getPetInfo(params?.petId.toString());
  petInfo.value = [data]
});
</script>
