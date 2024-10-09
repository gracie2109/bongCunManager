<template>
  <PageTitle />

  <ContentWrap>
    <div class="fixed top-[3.75rem] h-screen w-[92vw] bg-white overflow-y-auto">
      <div class="w-full h-full space-y-6 ml-2 p-3 ">
        <div class="service-card grid grid-cols-6 gap-4 ">
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
            />
          </div>
        </div>

        <div id="table_service_price">
          <ListServicesPriceTable />
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
import { Card, CardContent } from "@/components/ui/card";
import { onMounted, reactive, ref } from "vue";
import { Plus, Proportions } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
} from "@/components/ui/dialog";
import ServiceForm from "@/views/admin/pets/services/components/ServiceForm.vue";
import { useForm } from "vee-validate";
import type { z } from "zod";
import type { PetsServicesValid } from "@/validations/pets";
import { storeToRefs } from "pinia";
import ServiceCard from "../services/components/ServiceCard.vue";
import ServicePriceTable from "./components/ServicePriceTable.vue";
import ListServicesPriceTable from "./components/ListServicesPriceTable.vue";

const store = usePetServices();
const { petServices, loading } = storeToRefs(store);
const open = ref(false);
const form = useForm();

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
