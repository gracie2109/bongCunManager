<template>
  <div v-if="loading">
    <LoadingIndicator />
  </div>
  <div v-if="data && !loading" class="flex flex-wrap gap-3">
    <div
      class="h-28 w-28 rounded-sm border relative"
      :class="
        clsx({
          'border border-primary': props.elSelect?.id === i.id,
        })
      "
      v-for="(i, j) in props.data"
      :key="j"
    >
      <span
        class="relative w-full h-full text-center grid place-items-center font-semibold capitalize"
      >
        {{ i.name }}
      </span>

      <div
        class="absolute top-0 right-0 w-full h-[30%] rounded-tr-sm rounded-tl-sm bg-primary-subb"
      >
        <div class="flex gap-3 justify-end pr-3 my-auto items-center h-full">
          <Trash2 class="size-5 text-red-600" @click="() => handleDelete(i)" />
          <Edit
            class="size-5 text-green-600 cursor-pointer"
            @click="() => handleOpen(j, i)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoadingIndicator } from "@/components/common";
import clsx from "clsx";
import { Edit, Trash2 } from "lucide-vue-next";
import { toRaw } from "vue";

const props = defineProps<{
  data: any[];
  totalRecord: number;
  loading: boolean;
  elSelect?: any;
}>();

const emits = defineEmits(["openPermission","deleteItem"]);

const handleOpen = (name: any, item: any) => {
  const res = toRaw(item);
  emits("openPermission", {
    res,
  });
  return;
};
const handleDelete = (deleteItem: any) => {
  const res = toRaw(deleteItem);
  emits("deleteItem", {
    res,
  });
  return;
}
</script>
