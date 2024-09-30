<template>
  <Dialog :open="openSettingView" @update:open="$emit('changeOpenSettingView')">
    <DialogContent class="w-96 p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle> {{ $t("common.settingView") }}</DialogTitle>
      </DialogHeader>

      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div v-for="(i, j) in columns" :key="j" class="flex gap-3 items-center">
          <Checkbox
            :id="i.id"
            :checked="i.getIsVisible()"
            @update:checked="(value) => i.toggleVisibility(!!value)"
          />
          <label :for="i.id" class="cursor-pointer capitalize">{{ i.id }}</label>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";

import type { Table } from "@tanstack/vue-table";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
  table: Table<any>;
  openSettingView: boolean;
  saveColumnVisible: {
    name: string;
    isRemeber: boolean;
  };
}>();

const emits = defineEmits(["changeOpenSettingView"]);

const columns = computed(() => {
    return props.table.getAllColumns().filter((column) => {
        return typeof column.accessorFn !== "undefined" && column.getCanHide();
      });
})
const columns2 = ref();

function saveColumnSetting() {
  if (props.saveColumnVisible.isRemeber) {
    const visibleColumns = props.table.getVisibleLeafColumns();
    const resLocal = localStorage.getItem("visibleColumn") as any;
    const parseData = resLocal ? JSON.parse(resLocal) : null;

    if (parseData) {
      const res = {
        ...parseData,
        [props.saveColumnVisible.name]: visibleColumns.map((i) => i.id),
      };
      localStorage.setItem("visibleColumn", JSON.stringify(res));
    } else {
      const res = {
        [props.saveColumnVisible.name]: visibleColumns.map((i) => i.id),
      };
      localStorage.setItem("visibleColumn", JSON.stringify(res));
    }
  }
}

function getColumnSettingLocal() {
  const visibleColumns = props.table.getVisibleLeafColumns();
  const resLocal = localStorage.getItem("visibleColumn") as any;
  const parseData = resLocal ? JSON.parse(resLocal) : null;
  if (parseData) {
    const oldValue = parseData[props.saveColumnVisible.name];
    console.log("oldValue", oldValue);

    if (oldValue) {
      columns2.value = oldValue;
    } else {
      columns2.value = props.table.getAllColumns().filter((column) => {
        return typeof column.accessorFn !== "undefined" && column.getCanHide();
      });
    }
  }
}

watch(
  () => props.table.getVisibleLeafColumns(),
  () => {
    if (props.saveColumnVisible.isRemeber) {
      saveColumnSetting();
    }
  }
);

onMounted(() => {
  if (props.saveColumnVisible?.isRemeber) {
    getColumnSettingLocal();
  }
});
</script>
