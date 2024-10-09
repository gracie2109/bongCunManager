<template>
  <!-- <div class="border border-primary h-[100px] rounded-lg" id="create_btn"> -->
    <div
      class="flex w-full h-full items-center justify-center cursor-pointer"
      @click="() => (open = !open)"
    >
      <Plus class="size-4 mr-2" />
      <span class="font-semibold">
        {{ $t("common.create") }} {{ $t("pageMeta.services") }}</span
      >
    </div>
  <!-- </div> -->

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
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import { usePetServices } from "@/stores";
import { storeToRefs } from "pinia";
const open = ref(false);
const form = useForm();

const store = usePetServices();
const { petServices, loading } = storeToRefs(store);
const handleForm = form.handleSubmit(async (values: any) => {
  await store.createNewPetService(values).then(() => {
    open.value = !open.value;
    form.resetForm();
  });
});
</script>
