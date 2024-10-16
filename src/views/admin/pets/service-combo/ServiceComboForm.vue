<template>
  <div id="service_combo_form">

    <Dialog :open="props.open" @update:open="$emit('changeOpen')">
      <DialogContent
        class="sm:max-w-[425px] lg:max-w-[950px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 h-auto max-h-[90dvh]"
      >
        <DialogHeader class="p-6 pb-0">
          <DialogTitle> {{ $t("common.addNew") }}</DialogTitle>
          <DialogDescription>
            {{ $t("pageFields.serviceProvider.desc") }}
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4 px-6">
          <form class="space-y-6" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>{{ $t("common.name") }}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="shadcn"
                    v-bind="componentField"
                    size="lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid grid-cols-2 gap-3">
              <FormField v-slot="{ componentField }" name="price">
                <FormItem>
                  <FormLabel>{{ $t("common.price") }}</FormLabel>
                  <FormControl>
                    <InputContent
                      v-bind="componentField"
                      placeholder="price"
                      @update-value="(vl) => (price = vl)"
                      :contentValue="formatPrice(price)"
                      :form="props.form"
                       name="price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="estimateTime">
                <FormItem>
                  <FormLabel>Estimate time</FormLabel>
                  <FormControl>
                    <InputContent
                      v-bind="componentField"
                      placeholder="Estimate time"
                      @update-value="(vl) => (time = vl)"
                      :contentValue="convertNumberToTime(time)"
                      :form="props.form"
                      name="estimateTime"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <FormField v-slot="{ componentField }" name="markAsId">
                <FormItem>
                  <FormLabel>Mark as</FormLabel>

                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a verified email to display"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          :value="String(i.id)"
                          :key="ii"
                          v-for="(i, ii) in status"
                        >
                          <span>
                            {{ (i.name as any)[locale] }}
                          </span>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="markTime">
                <FormItem>
                  <FormLabel>Mark time</FormLabel>
                  <VueDatePicker
                    v-bind="componentField"
                    v-model="date"
                    range
                    :preset-dates="presetDates"
                    :readonly="props.form.values['markAsId'] === '4'"
                  >
                    <template
                      #preset-date-range-button="{ label, value, presetDate }"
                    >
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
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="desc">
              <FormItem>
                <FormLabel>{{ $t("common.description") }}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    class="resize-none"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <DialogFooter class="p-6 pt-0">
              <Button
                type="button"
                variant="outline"
                @click="$emit('changeOpen')"
              >
                Cancel
              </Button>
              <Button type="submit"> Save changes </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { onMounted, ref, watch, watchEffect } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { InputContent } from "@/components/common";
import { convertNumberToTime, formatPrice } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";

import { status } from "@/data/status.json";
import { useI18n } from "vue-i18n";
import type { FormContext } from "vee-validate";
import { usePetCombo } from "@/stores";

const props = defineProps<{
  form: FormContext<any>;
  open: boolean;
  rowEditting?: any;
}>();

const emit = defineEmits(["onSubmitHdl", "changeOpen"]);
const { locale } = useI18n();
const dataItem = ref();
const store = usePetCombo();

const date = ref();
const time = ref();
const price = ref();

const onSubmit = props.form.handleSubmit(async (values: any) => {
  if (!dataItem.value) {
    const pl = { ...values, status: 1 };
    await store.createNewPetCombo(pl);
    date.value = null;
    time.value = null;
    price.value = null;
    emit("changeOpen");
  }
});

const presetDates = ref([
  { label: "Today", value: [new Date(), new Date()] },
  {
    label: "Today (Slot)",
    value: [new Date(), new Date()],
    slot: "preset-date-range-button",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ],
  },
  {
    label: "This year",
    value: [startOfYear(new Date()), endOfYear(new Date())],
  },
]);

watch(
  () => props.rowEditting,
  (newVal) => {
    console.log("pros", props.rowEditting, newVal);
    props.form.setValues({ ...newVal }, true);
    price.value = newVal['price'];
    time.value = newVal['estimateTime']
   }
);


</script>
