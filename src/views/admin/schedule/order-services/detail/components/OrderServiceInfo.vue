<template>
  <div id="order_service_info" class="border border-red-600 h-23">
    <div v-if="props.data" class="space-y-12">
      <div
        v-for="(i, ii) in props.data.services"
        v-if="props.data.services"
        :key="ii"
        class="border-b border-b-[#f5f5f5]"
      >
        <p class="font-semibold">Name: {{ i.name || "" }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: any;
}>();
</script>
