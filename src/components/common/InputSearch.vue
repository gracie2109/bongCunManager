<template>
  <div class="relative w w-full items-center">
    <Input
      id="search"
      type="text"
      :placeholder="props.placeholder"
      class="pl-10"
      :size="props.size"
      @update:model-value="(vl) => debouncedFn(vl)"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-4 text-muted-foreground" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { Input, type InputVariants } from "@/components/ui/input";
import { defineProps, withDefaults } from "vue";
import { ref } from "vue";
import { useDebounceFn } from '@vueuse/core'

type SearchProps = {
  placeholder: string;
  size: InputVariants["size"];
};
const props = withDefaults(defineProps<SearchProps>(), {
  size: "default",
});
const emits = defineEmits(['onInput'])
const modelValue = ref();

const debouncedFn = useDebounceFn((vl) => {
  modelValue.value =vl;
  emits('onInput', vl)
}, 1000, { maxWait: 5000 })

</script>
