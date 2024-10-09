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
            <div
              class="flex w-full h-full items-center justify-center cursor-pointer"
              @click="() => (open = !open)"
            >
              <Plus class="size-4 mr-2" />
              <span class="font-semibold">
                {{ $t("common.create") }} {{ $t("pageMeta.services") }}</span
              >
            </div>
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

    <Dialog :open="open" @update:open="() => (open = !open)">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new service </DialogTitle>
        </DialogHeader>
        <ServiceForm :form="form" :show-btn="false" @on-submit="handleForm" />
        <DialogFooter class="p-6 pt-0">
          <Button
            type="button"
            variant="outline"
            @click="
              () => {
                open = !open;
                form.resetForm();
              }
            "
          >
            Cancel
          </Button>
          <Button type="submit" @click="handleForm"> Save changes </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </ContentWrap>
</template>

<script setup lang="ts">
import { usePetServices } from "@/stores";
import { ContentWrap } from "@/views/admin/components";
import PageTitle from "../PageTitle.vue";
import { onMounted, ref } from "vue";
import { Camera, Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ServiceForm from "@/views/admin/pets/services/components/ServiceForm.vue";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import ServiceCard from "../services/components/ServiceCard.vue";
import ListServicesPriceTable from "./components/ListServicesPriceTable.vue";

const store = usePetServices();
const { petServices, loading } = storeToRefs(store);
console.log('petServices',petServices)
const open = ref(false);
const form = useForm();

const isMouseId = ref("");

const handleMouseEv = (value: string) => {
  isMouseId.value = value;
};

const handleForm = form.handleSubmit(async (values: any) => {
  await store.createNewPetService(values).then(() => {
    open.value = !open.value;
    form.resetForm();
  });
});

onMounted(async () => {
  await store.getListPetService({ pageIndex: 1, pageSize: 500 });
});
</script>
