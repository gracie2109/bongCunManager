<template>
  <form @submit.prevent="submitHandle" class="space-y-6 grid">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem v-auto-animate>
        <FormLabel> Role Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="users, products...." v-bind="componentField" />
        </FormControl>
        <FormDescription>Not support Vietnam tone</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem v-auto-animate>
        <FormLabel> Description</FormLabel>
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
    <div>
      <FormField v-slot="{ componentField }" name="permissions">
        <FormItem v-auto-animate>
          <FormLabel> Description</FormLabel>
          <FormControl
            ><div class="h-[200px] overflow-y-auto">
              <TreePermission
                v-bind="componentField"
                :data="props.permissions"
                :form="props.form"
                :elSelect="props.elSelect"
                :reset="props.isEditSuccess"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="text-sm border rounded-sm p-3" v-if="allPermission">
      <p class="text-red-600 font-semibold">Preview:</p>
      <ol v-for="(i, j) in allPermission" :key="j">
        <li>{{ i }}</li>
      </ol>
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
import { Textarea } from "@/components/ui/textarea";
import type { FormContext } from "vee-validate";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import { ref, watch } from "vue";
import TreePermission from "./TreePermission.vue";

const props = defineProps<{
  form: FormContext<any>;
  loading: boolean;
  elSelect?: any;
  permissions: any[];
  isEditSuccess: boolean;
}>();

const allPermission = ref<string[] | null>(null);
const emit = defineEmits(["onSubmit", "closeDialog"]);
const submitHandle = async () => {
  emit("onSubmit");
};

watch(
  () => props.isEditSuccess,
  () => {
    if (props.isEditSuccess) {
      props.form.handleReset();
    }
  }
);
</script>
