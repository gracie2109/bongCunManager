<template>
  <Header>
    <div class="flex gap-x-2 items-center">
      <h1
        class="font-semibold flex items-center gap-2"
        :class="
          clsx({
            'cursor-pointer': !isShowAllPets,
          })
        "
        @click="
          () => {
            if (isShowAllPets) return;
            else $router.push({ name: 'pets' });
          }
        "
      >
        <PawPrint class="size-4 text-primary" />
        {{ $t("pageMeta.pets") }} ({{ petRecords }})
      </h1>

      <div v-if="$route.name !== 'pets'" class="flex">
        <div
          id="services"
          class="flex items-center cursor-pointer"
          @click="handleBackService"
        >
          <ChevronRight class="size-4 mr-2" />
          <h1
            class="font-semibold flex items-center gap-2 text-muted-foreground"
          >
            {{ $t("pageMeta.settingPetServicePrice") }}
          </h1>
        </div>

        <div
          class="flex items-center cursor-pointer"
          v-if="petInfo || petId"
          @click="handleBackPet"
        >
          <ChevronRight class="size-4 mr-2" />
          <div class="flex items-center h-full gap-2">
            <Icon :icon="petInfo.icon" v-if="petInfo"/>
            <h1
              class="font-semibold flex items-center gap-2 text-muted-foreground"
            >
              {{ petInfo?.name || petId}}
            </h1>
          </div>
        </div>
        <div class="flex items-center cursor-pointer" v-if="serviceInfo">
          <ChevronRight class="size-4 mr-2" />
          <div class="flex items-center h-full gap-2">
            <h1
              class="font-semibold flex items-center gap-2 text-muted-foreground"
            >
              {{ serviceInfo.name }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </Header>
</template>

<script setup lang="ts">
import { COLLECTION } from "@/lib/constants";
import { getDetailData, getTotalRecord } from "@/lib/firebaseFn";
import router from "@/router";
import { Header } from "@/views/admin/components";
import clsx from "clsx";
import { PawPrint, ChevronRight } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";

const petRecords = ref(0);
const route = useRoute();
const { petId, serviceId } = route.params;

const petInfo = ref();
const serviceInfo = ref();
const isShowAllPets = computed(() => {
  if (route.name === "pets") return true;
  else return false;
});

function handleBackPet() {
  router.push({
    name: "settingPetServicePrice",
    params: { petId: petId },
  });
}
function handleBackService() {
  router.push({
    name: "petService",
  });
}
onMounted(async () => {
  const data = await getTotalRecord(COLLECTION.PETS);
  petRecords.value = data;
});
onMounted(async () => {
  if (!isShowAllPets.value) {
    const pet = await getDetailData(
      COLLECTION.PETS,
      "__name__",
      String(route.params.petId)
    );
    if (!pet.empty) {
      petInfo.value = pet.docs[0].data();
    }
  }
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
