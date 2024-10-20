<template>
  <div>
    <form @submit.prevent="submitHandle" class="space-y-6 grid">
      <div class="text-center w-full grid place-items-center">
        <FormField v-slot="{ componentField }" name="photoURL">
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <UploadFields
                :folder-name="'users'"
                :limit="1"
                v-bind="componentField"
                :showControl="false"
                @set-images="setImages"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="h-96 p-2 overflow-y-scroll">
        <div class="grid grid-cols-2 grid-wrap gap-x-6 gap-y-3">
          <FormField v-slot="{ componentField }" name="displayName">
            <FormItem v-auto-animate>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="users, products...."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="users, products...."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="fullName">
            <FormItem v-auto-animate>
              <FormLabel>fullName</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="users, products...."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phoneNumber">
            <FormItem v-auto-animate>
              <FormLabel>phoneNumber</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="users, products...."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="users, products...."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="gender">
            <FormItem>
              <FormLabel>gender</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a verified type to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="(i, ii) in BASE_GENDER" :value="i.value">
                      {{ (BASE_GENDER[ii].name as any)[String(locale)] }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <FormField v-slot="{ componentField }" name="groupIds">
          <FormItem>
            <FormLabel>User group</FormLabel>
            <FormControl>
              <Multiselect
                v-bind="componentField"
                v-model="groups"
                :options="props.listUserGroup"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                placeholder="choose group"
                label="name"
                track-by="name"
                :taggable="true"
                @update:modelValue="(value:any) => {
                               props.form.setFieldValue('groupIds', value?.map((i:any) => i.id));
                               props.form.setFieldValue('groupProfile', value?.map((i:any) => i))

                            }"
              >
              </Multiselect>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <ProvinceAddress
          :addressModel="props.addressModel"
          :form="props.form"
          field-name="province"
        />
      </div>

      <div class="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          class="mt-8 w-40"
          :disabled="props.loading"
          @click="$emit('closeDialog')"
        >
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading" />
          <span v-if="props.loading">Loading </span>
          <span v-else>Close</span>
        </Button>

        <Button type="submit" class="mt-8 w-40" :disabled="props.loading">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading" />
          <span v-if="props.loading">Loading </span>
          <span v-else>Submit</span>
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { FormContext } from "vee-validate";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { BASE_GENDER } from "@/lib/constants";
import { UploadFields, ProvinceAddress } from "@/components/common/";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "vue-i18n";
import Multiselect from "vue-multiselect";
import { ref, watch } from "vue";
import { initAddress, type IAddress } from "@/types/location.type";
import type { IUser } from "@/types/user.type";
const props = defineProps<{
  form: FormContext<IUser>;
  loading: boolean;
  listUserGroup: any[];
  addressModel: IAddress;
}>();

const emit = defineEmits(["onSubmit", "closeDialog"]);
const groups = ref([]);
const { locale } = useI18n();

const setImages = (images: any[]) => {
  props.form.setFieldValue("images", images);
};

const submitHandle = async () => {
  emit("onSubmit");
};
</script>
