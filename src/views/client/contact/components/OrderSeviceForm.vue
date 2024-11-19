<template>
  <div>
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
      <FormField v-slot="{ componentField, value }" name="petNum">
        <FormItem>
          <FormLabel>Pet numb</FormLabel>
          <FormControl>
            <Slider
              v-model="petNum"
              v-bind="componentField"
              :default-value="[1]"
              :max="5"
              :min="1"
            />
            <FormDescription class="flex justify-between">
              <span>How many pets use the service?</span>
              <span>{{ value?.[0] }}</span>
            </FormDescription>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div id="time">
        <FormField v-slot="{ componentField }" name="time">
          <FormItem>
            <FormLabel>Time</FormLabel>
            <FormControl>
              <VueDatePicker
                v-model="date"
                v-bind="componentField"
                placeholder="Select Date"
                :min-time="{
                  hours: CURRENT_DATE.hour,
                  minutes: CURRENT_DATE.add({ minutes: 30 }).minute,
                }"
                :max-time="{ hours: 23, minutes: 0 }"
                focus-start-date
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div>
        <FormField v-slot="{ componentField }" name="services">
          <FormItem>
            <FormLabel>Service</FormLabel>
            <FormControl>
              <div class="grid grid-cols-2 gap-3">
                <section>
                  <div v-for="(i, j) in props.listCombo" class="space-y-3">
                    <div>
                      <Checkbox
                        class="mr-2"
                        :name="i.id"
                        v-model="items"
                        @update:checked="
                          (bool) => {
                            const data = bool
                              ? [...new Set([...items, { ...i, type: 'combo' }])]
                              : items.filter((i) => i?.id !== i?.id);

                            items = data;
                            props.form.setValues({ services: data });
                          }
                        "
                      />
                      <label :for="i.id"> {{ i.name }}</label>
                    </div>
                  </div>
                </section>
                <section>
                  <div class="space-y-3" v-for="(i, j) in props.listService">
                    <div>
                      <Checkbox
                        class="mr-2"
                        :value="i.id"
                        v-model="items"
                        @update:checked="
                          (bool) => {
                            const data = bool
                              ? [...new Set([...items, { ...i, type: 'service' }])]
                              : items.filter((i) => i?.id !== i?.id);

                            items = data;
                            props.form.setValues({ services: data });
                          }
                        "
                      />
                      <label :for="i.id"> {{ i.name }}</label>
                    </div>
                  </div>
                </section>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@/components/ui/input/Input.vue";
import type { FormContext } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CURRENT_DATE } from "@/lib/constants";
import { Slider } from "@/components/ui/slider";

const props = defineProps<{
  form: FormContext;
  listService: any[];
  listCombo: any[];
  loading?: boolean;
}>();

const emits = defineEmits(["submit"]);
const items = ref<any[]>([]);
const petNum = ref([1]);
const date = ref(new Date());

const onSubmit = () => {
  emits("submit");
};
</script>
