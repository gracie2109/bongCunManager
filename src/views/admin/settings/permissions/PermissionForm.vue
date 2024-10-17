<template>
  <form @submit="submitHandle" class="space-y-6 grid">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem v-auto-animate>
        <FormLabel> Indentity Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="users, products...."
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>Not support Vietnam tone</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="methods">
      <FormItem>
        <div class="mb-4">
          <FormLabel class="text-base"> Permission </FormLabel>
          <FormDescription>
            Select the permissions you want to display in the role.
          </FormDescription>
        </div>

        <div class="flex gap-6 flex-wrap items-center">
          <FormField
            v-for="item in baseMethods"
            v-slot="{ value, handleChange }"
            v-model:model-value="permissions"
            :key="item.id"
            name="methods"
          >
            <FormItem
              :key="item.id"
              class="flex items-center space-x-2 space-y-0.5"
            >
              <FormControl>
                <Checkbox
                  :checked="value?.includes(item.id)"
                  @update:checked="
                    (checked) => {
                      if (Array.isArray(value)) {
                        handleChange(
                          checked
                            ? [...value, item.id]
                            : value.filter((id) => id !== item.id)
                        );
                      }
                    }
                  "
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ item.value }}
              </FormLabel>
            </FormItem>
          </FormField>
        </div>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="text-sm border rounded-sm p-3" v-if="allPermission">
      <p class="text-red-600 font-semibold">Preview:</p>
      <ol v-for="(i, j) in allPermission" :key="j">
        <li>{{ i }}</li>
      </ol>
    </div>
    <Button type="submit" class="mt-8 w-40" :disabled="props.loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="props.loading" />
      <span v-if="props.loading">Loading </span>
      <span v-else>Submit</span>
    </Button>
  </form>
</template>

<script lang="ts" setup>
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormContext } from "vee-validate";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { baseMethods } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { ref, watch } from "vue";
import { usePermissionStore } from "@/stores";

const props = defineProps<{
  form: FormContext<any>;
  loading: boolean;
}>();

const allPermission = ref<string[] | null>(null);
const permissions = ref([]);
const emit = defineEmits(["onSubmit"]);
const store = usePermissionStore();

const submitHandle = async () => {
  //   await emit("onSubmit");
};

watch(
  () => props.form.values,
  () => {
    const { name, methods } = props.form.values;
    console.log("name", name);
    console.log("methods", methods);
    //   if(name && methods.length> 0) allPermission.value = store.modifyData({name, methods})
    //   else allPermission.value = null
  }
);
</script>
