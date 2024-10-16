<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>{{ $t("common.name") }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="shadcn"
            v-bind="componentField"
            size="sm"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div id="choose_pets">
      <Label class="font-bold mb-3">Choose pets</Label>
      <multiselect
        v-model="petsSelected"
        :options="pets"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="choose pets"
        label="name"
        track-by="name"
        :taggable="true"
        @update:modelValue="(value:any) => {
                               props.form.setFieldValue('petIds', value?.map((i:any) => i.id));
                               props.form.setFieldValue('petsProfiles', value?.map((i:any) => i))
                            }"
      >
      </multiselect>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>Type</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified type to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="(i, ii) in type" :value="i.id">
                  {{ (type[ii].lang as any)[String(locale)] }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="unit"
        v-if="props.form.values['type'] === 'all'"
      >
        <FormItem class="space-y-3">
          <FormLabel>Unit</FormLabel>

          <FormControl>
            <RadioGroup class="flex gap-6 space-y-1" v-bind="componentField">
              <FormItem
                class="flex items-center space-y-0 gap-x-3"
                v-for="(i, ii) in unit"
              >
                <FormControl>
                  <RadioGroupItem :value="i.id" />
                </FormControl>
                <FormLabel class="font-normal">
                  {{ (unit[ii].lang as any)[String(locale)] }}
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField
      v-slot="{ componentField }"
      type="radio"
      name="generalPrice"
      v-if="props.form.values['type'] === 'all'"
    >
      <FormItem class="space-y-3">
        <FormLabel>General Price</FormLabel>

        <FormControl>
          <Input
            type="number"
            v-bind="componentField"
            size="sm"
            placeholder="Enter general price"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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

    <div v-if="props.showBtn">
      <Button type="button" variant="outline"> Cancel </Button>
      <Button type="submit"> Save changes </Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { FormField } from "@/components/ui/form";
import FormControl from "@/components/ui/form/FormControl.vue";
import FormItem from "@/components/ui/form/FormItem.vue";
import FormLabel from "@/components/ui/form/FormLabel.vue";
import FormMessage from "@/components/ui/form/FormMessage.vue";
import Input from "@/components/ui/input/Input.vue";
import { Textarea } from "@/components/ui/textarea";
import type { FormContext } from "vee-validate";
import { usePets, usePetServices } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, getCurrentInstance, onMounted, ref, type Ref } from "vue";
import Multiselect from "vue-multiselect";
import Label from "@/components/ui/label/Label.vue";
import Button from "@/components/ui/button/Button.vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { contents as unit, type } from "@/data/pet-service.json";
import type { PetsServicesValid } from "@/validations/pets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { z } from "zod";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  form: FormContext<any>;
  showBtn: boolean;
}>();
const { locale } = useI18n();
const emits = defineEmits(["onSubmit"]);
const petStore = usePets();
const petServiceStore = usePetServices();
const { loading, pets } = storeToRefs(petStore);
const petsSelected = ref<any[]>([]);

const onFormSubmit = props.form.handleSubmit(
  async (values: z.infer<typeof PetsServicesValid>) => {}
);

const onSubmit = (values: any) => {
  const petIds = petsSelected.value.map((i) => i.id);
  if (!props.showBtn) {
    emits("onSubmit", values);
  } else {
    onFormSubmit(values);
  }
};

onMounted(async () => {
  await petStore.getListPets({ pageIndex: 1, pageSize: 500 });
});
</script>
