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

      <div v-if="!isShowAllPets" class="flex items-center">
        <ChevronRight class="size-4 mr-2" />
        <h1 class="font-semibold flex items-center gap-2 text-muted-foreground">
          {{ $t("pageMeta.settingPetServicePrice") }}
        </h1>
      </div>
    </div>
  </Header>
</template>

<script setup lang="ts">
import { COLLECTION } from "@/lib/constants";
import { getTotalRecord } from "@/lib/firebaseFn";
import router from "@/router";
import { Header } from "@/views/admin/components";
import clsx from "clsx";
import { PawPrint, ChevronRight } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const petRecords = ref(0);
const route = useRoute();

const isShowAllPets = computed(() => {
  if (route.name === "pets") return true;
  else return false;
});

onMounted(async () => {
  const data = await getTotalRecord(COLLECTION.PETS);
  petRecords.value = data;
});
</script>
