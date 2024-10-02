<template>
  <div class="flex gap-3 items-center" v-if="totalPage > 1">
    <Button
      size="xss"
      v-for="(i, j) in totalPage"
      :key="j"
      v-if="totalPage"
      @click="
        () => {
          $emit('onChange', i);
        }
      "
      :variant="props.pageCurrent !== +j + 1 ? 'outline' : 'default'"
    >
      {{ i }}
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Button } from "@/components/ui/button";
const props = defineProps<{
  totalRecord: number;
  pageCurrent: number;
  pageSize: number;
}>();

const emits = defineEmits(["onChange"]);
const totalPage = computed(() => Math.ceil(props.totalRecord / props.pageSize));
</script>
