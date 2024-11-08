<template>
  <div>
    <VueDatePicker
      v-model="props.rangeDate"
      range
      :preset-dates="presetDates"
      @update:model-value="handleDate"
    >
      <template #preset-date-range-button="{ label, value, presetDate }">
        <span
          role="button"
          :tabindex="0"
          @click="presetDate(value)"
          @keyup.enter.prevent="presetDate(value)"
          @keyup.space.prevent="presetDate(value)"
        >
          {{ label }}
        </span>
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { TIME_OPTIONS } from "@/lib/constants";

const presetDates = ref(TIME_OPTIONS);

const props = defineProps<{
  rangeDate: any;
}>();

const emits = defineEmits(["changeDate"]);

const handleDate = (modelData: any) => {
  emits("changeDate", modelData);
};
</script>
