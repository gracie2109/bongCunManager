<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-6">
      <div
        class="h-28 w-28 rounded-sm border cursor-pointer"
        @click="() => (open = !open)"
      >
        <div class="text-center w-full h-full m-auto grid place-items-center">
          <PlusCircle class="size-6" />
          new permisson
        </div>
      </div>
      <ListPermissions
        :data="permissions"
        :loading="loading"
        :total-record="pageCount"
        @open-permission="handleOpenPermission"
        @delete-item="onDelete"
        :elSelect="elSelect"
      />
    </div>
    <Dialog
      :open="open"
      @update:open="
        () => {
          open = !open;
          elSelect = [];
        }
      "
    >
      <DialogContent>
        <PermissionForm
          :loading="loading"
          :form="form"
          @on-submit="handleSubmit"
          @close-dialog="closeDialog"
          :elSelect="elSelect"
        />
      </DialogContent>
    </Dialog>

    <DialogConfirm
      @change-open="
        () => {
          elSelect = null;
          open = !open;
        }
      "
      :open="openDelete"
      :title="elSelect?.name"
      @cancel="
        () => {
          elSelect = null;
          openDelete = false;
        }
      "
      @handleOk="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import PermissionForm from "./components/PermissionForm.vue";
import { onMounted, ref } from "vue";
import { usePermissionStore } from "@/stores";
import { PlusCircle } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ListPermissions from "./components/ListPermissions.vue";
import { DialogConfirm } from "@/components/common";

const store = usePermissionStore();
const form = useForm();
const { loading, permissions, pageCount } = storeToRefs(store);
const elSelect = ref();
const open = ref(false);
const openDelete = ref(false);

const handleSubmit = form.handleSubmit(async (value: any) => {
  if (!elSelect.value) {
    await store.createNewPermission(value);
    form.resetForm();
    open.value = !open.value;
  } else {
    await store.editPermission(value);
    open.value = !open.value;
  }
});

const closeDialog = () => {
  form.resetForm();
  open.value = !open.value;
  elSelect.value = [];
};

const handleOpenPermission = (item: any) => {
  elSelect.value = item.res;
  open.value = true;
  form.setValues({ ...item.res });
};
const onDelete = (item: any) => {
  elSelect.value = item.res;
  openDelete.value = true;
};
const handleDelete = async (item: any) => {
  await store.deletePermissions(elSelect.value.id);
  openDelete.value = false;
  elSelect.value = [];
};

onMounted(async () => {
  await store.getListPermissions();
});
</script>
