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
        <div class="grid gap-4 py-4 px-6 overflow-y-auto">
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
            <FormField v-slot="{ componentField }" name="petIds">
              <FormItem>
                <FormLabel>PetIds</FormLabel>
                <FormControl>
                  <Multiselect
                    v-bind="componentField"
                    v-model="petSelected"
                    :options="listPet"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="choose service"
                    label="name"
                    track-by="name"
                    :taggable="true"
                    @update:modelValue="(value:any) => {
                               props.form.setFieldValue('petIds', value?.map((i:any) => i.id));
                               props.form.setFieldValue('petProfiles', value?.map((i:any) => i))

                            }"
                  >
                  </Multiselect>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="serviceIds">
              <FormItem>
                <FormLabel>serviceIds</FormLabel>
                <FormControl>
                  <Multiselect
                    v-bind="componentField"
                    v-model="serviceSelected"
                    :options="listServices"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="choose service"
                    label="name"
                    track-by="name"
                    :taggable="true"
                    @update:modelValue="(value:any) => {
                               props.form.setFieldValue('serviceIds', value?.map((i:any) => i.id));
                               props.form.setFieldValue('serviceProfiles', value?.map((i:any) => i))
                            }"
                  >
                  </Multiselect>
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
              <!-- <FormField v-slot="{ componentField }" name="duration">
                <FormItem>
                  <FormLabel>Estimate time</FormLabel>
                  <FormControl>
                    <InputContent
                      v-bind="componentField"
                      placeholder="Estimate time"
                      @update-value="(vl) => (time = vl)"
                      :contentValue="convertNumberToTime(time)"
                      :form="props.form"
                      name="duration"
                    />
                    <Slider
                      v-model="time"
                      :max="100"
                      :step="1"
                      :class="cn('w-3/5', $attrs.class ?? '')"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField> -->

              <FormField v-slot="{ componentField, value }" name="duration">
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Slider
                      v-bind="componentField"
                      :default-value="[0]"
                      :max="1439"
                      :min="0"
                      :step="5"
                    />
                    <FormDescription class="flex justify-between">
                      <span>{{ convertNumberToTime(value?.[0] || 0) }} m</span>
                    </FormDescription>
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
import { cn, convertNumberToTime, formatPrice } from "@/lib/utils";
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
import { usePetCombo, usePetServices } from "@/stores";
import Multiselect from "vue-multiselect";
import { Slider } from "@/components/ui/slider";

const props = defineProps<{
  form: FormContext<any>;
  open: boolean;
  rowEditting?: any;
  listPet: any[];
}>();

const emit = defineEmits(["onSubmitHdl", "changeOpen"]);
const { locale } = useI18n();
const dataItem = ref();
const store = usePetCombo();
const serviceStore = usePetServices();
const date = ref();
const time = ref([0]);
const price = ref();
const serviceSelected = ref<any[]>([]);
const petSelected = ref<any[]>([]);
const listServices = ref<any[]>([]);

function resetAll() {
  props.form.resetForm();
  date.value = null;
  time.value = [0];
  price.value = null;
  serviceSelected.value = [];
  petSelected.value = [];
}
const onSubmit = props.form.handleSubmit(async (values: any) => {
  if (!dataItem.value) {
    const pl = { ...values, status: 1 };
    await store.createNewPetCombo(pl);
    resetAll();
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
  () => petSelected.value,
  async () => {
    if (!petSelected.value || petSelected.value.length === 0) {
      serviceSelected.value = [];
      listServices.value = [];
      props.form.setFieldValue("serviceIds", []);
      return;
    }

    const response = await serviceStore.searchServiceOfPet({
      petIds: petSelected.value.map((i) => i?.id),
    });
    listServices.value = response || [];

    const selectedServiceIds = serviceSelected.value.map(
      (service) => service.id
    );

    const validServices = serviceSelected.value.filter((service) =>
      listServices.value.some((respService) => respService.id === service.id)
    );

    serviceSelected.value = validServices;

    if (validServices.length !== selectedServiceIds.length) {
      props.form.setFieldValue(
        "serviceIds",
        validServices.map((service) => service.id)
      );
    } else {
      props.form.setFieldValue("serviceIds", selectedServiceIds);
    }
  }
);

watch(
  () => props.rowEditting,
  (newVal) => {
    props.form.setValues({ ...newVal }, true);
    price.value = newVal["price"];
    time.value = newVal["duration"];
  }
);

watch(
  () => props.open,
  () => {
    if (!props.open) {
      resetAll();
    }
  }
);
</script>
