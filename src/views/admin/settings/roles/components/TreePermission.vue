<template>
  <div class="grid grid-cols-2 gap-4">
    <details v-for="(i, j) in props.data" :key="j" class="w-full p-4" :open="isOpen(i)">
      <summary class="font-semibold">{{ i.name }}</summary>

      <div class="space-y-3">
        <div v-for="(m, mm) in i?.methods" :key="mm" class="flex items-center">
          <Checkbox :id="`${i.id || i.value.id}_${m}`" :value="`${i.id || i.value.id}_${m}`" name="methods"
            :checked="isChecked(i, m)" @update:checked="(bool: any) => handleChoose(bool, i, m)" />
          <label :for="`${i.id || i.value.id}_${m}`" class="ml-2">{{ m }}</label>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import type { FormContext } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps<{
  data: any[];
  form: FormContext<any>;
  elSelect: any;
  reset: boolean;
}>();

const itemSelect = ref<any[]>(props.elSelect?.permissions || []);

const isChecked = (item: { id: any }, method: any) => {
  if (itemSelect.value) {
    const existingItem = itemSelect.value.find((i) => i.id === item.id);
    return existingItem ? existingItem.method?.includes(method) : false;
  }
};
const isOpen = (item: { id: any }) => {
  const existingItem = itemSelect.value.find((i) => i.id === item.id);
  return existingItem && existingItem.method.length > 0;
};
function handleChoose(status: any, item: { id: any }, method: any) {
  const existingItem = itemSelect.value.find((i) => i.id === item.id);

  if (!existingItem) {
    status && itemSelect.value.push({ id: item.id, method: [method] });
  } else {
    existingItem.method = status
      ? [...new Set([...existingItem.method, method])]
      : existingItem.method.filter((m: string) => m !== method);

    if (!existingItem.method.length) {
      itemSelect.value = itemSelect.value.filter((i) => i.id !== item.id);
    }
  }
  if (props.form) {
    props.form.setFieldValue("permissions", itemSelect.value);
  }
}

watch(
  () => props.reset,
  () => {
    if (props.reset) {
      itemSelect.value = [];
    }
  }
);
</script>
