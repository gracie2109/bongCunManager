<template>
  <div>
    <VueDatePicker v-model="props.rangeDate" range :preset-dates="presetDates">
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
  rangeDate: any
}>()
// const date = ref(TIME_OPTIONS[0]["value"]);


// provide("search_range_time", date)

</script>
