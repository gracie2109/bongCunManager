<template>
  <div>
    loading:::{{ loading }}
    <form class="space-y-6" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>{{ $t("common.name") }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" size="sm" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phoneNumber">
        <FormItem>
          <FormLabel>{{ $t("common.phone") }}</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" size="sm" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="grid grid-cols-2 gap-3 ">
        <section>
          <div v-for="(i, j) in props.listCombo" class="space-y-3">
            <div>
              <Checkbox  class="mr-2" :name="i.id"  v-model="items" @update:checked="(bool) => {
                items = bool
                  ? [...new Set([...items, { ...i, type: 'service' }])]
                  : items.filter((i) => i?.id == i?.id);
              }
                " />
              <label :for="i.id"> {{ i.name }}</label>
            </div>
          </div>
        </section>
        <section>
          <div class="space-y-3" v-for="(i, j) in props.listService">
            <div>
              <Checkbox class="mr-2" :value="i.id" v-model="items" @update:checked="(bool) => {
                items = bool
                  ? [...new Set([...items, { ...i, type: 'combo' }])]
                  : items.filter((i) => i?.id !== i?.id);
              }
                " />
              <label :for="i.id"> {{ i.name }}</label>
            </div>
          </div>
        </section>
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import Input from "@/components/ui/input/Input.vue";
import type { FormContext } from "vee-validate";
import { usePetServices, usePetCombo } from "@/stores";
import { computed, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import { ref } from "vue";
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
  form: FormContext;
  listService: any[];
  listCombo: any[];
  loading?: boolean;
}>();

const emits = defineEmits(["submit"]);
const items = ref<any[]>([]);
const onSubmit = () => {
  emits("submit");
};
const date = ref();
const presetDates = ref([
  { label: "Today", value: [new Date(), new Date()] },
  {
    label: "Last month",
    value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
  },
  {
    label: "This year",
    value: [startOfYear(new Date()), endOfYear(new Date())],
  },
]);
</script>
