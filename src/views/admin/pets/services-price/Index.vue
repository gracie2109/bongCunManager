<template>
  <PageTitle />

  <ContentWrap>
    <div
      class="fixed top-[3.75rem] h-screen w-full"
    >
      <div class="w-full h-full space-y-6 ml-2">
        <div class="w-full h-auto flex flex-wrap pb-5  bg-white  border border-dashed">
        <div class="w-full grid place-items-center mt-5 space-y-4 max-w-[95%]">
          <p class="font-bold" v-if="petServices.length < 1">{{ $t("pageFields.pets.dontHasService") }}</p>
          <Button class="flex" variant="default" @click="() => (open = !open)">
            <Plus class="size-4 mr-2" />
            {{ $t("common.create") }} {{ $t("pageMeta.services") }}
          </Button>
        </div>
      </div>
      <div class="service-card grid grid-cols-5 gap-4">
          <div v-for="(i, j) in petServices">
            <ServiceCard :data="i" :key="j" :enable="String($route.params.petId)"/>
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
