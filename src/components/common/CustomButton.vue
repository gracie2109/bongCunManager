<template>
  <Button
    :disabled="props.disabled || props.loading"
    :size="props.size || 'default'"
    :variant="props.variant || 'default'"
  >
    <Loader2 v-if="props.loading" class="w-4 h-4 mr-2 animate-spin"/>
    <slot name="icon"></slot>
    <span v-if="!hasIconSlot">{{ props.buttonText || '' }}</span>
  </Button>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';
import { Button, type ButtonProps } from "@/components/ui/button";
import { Loader2 } from 'lucide-vue-next';

const slots = useSlots();
const hasIconSlot = !!slots.icon;

type ICustomBtn = {
  disabled?: boolean;
  loading?: boolean;
  buttonText: string;
  icon?: any;
} & ButtonProps;

const props = defineProps<ICustomBtn>();

</script>
