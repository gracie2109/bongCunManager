<template>
  <FormField :name="name">
    <template #default="scope">
      <FormItem>
        <FormControl class="relative">
          <div class="relative">
            <input
              type="text"
              class="text-sm w-full relative"
              :placeholder="placeholder"
              v-bind="scope"
              :value="modelValue" 
              @input="onInput" 
              :class="{
                'invalid p-invalid': isInValid,
              }"
            />
            <div class="absolute right-0 bottom-2 cursor-pointer" v-if="isInValid">
              <TooltipProvider>
                <Tooltip as="p">
                  <TooltipTrigger>
                    <InfoIcon class="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ error }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </FormControl>
      </FormItem>
    </template> 
  </FormField>
</template>
<script lang="ts" setup>
import { computed, ref, defineProps, defineEmits } from 'vue';

import { InfoIcon } from "lucide-vue-next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

defineProps<{
  name: String;
  placeholder: String;
  error: any;
  isInValid: Boolean;
  modelValue: String,  
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};

</script>

<style scoped>
.invalid {
  border-bottom: 1px solid red !important;
}
input {
  height: 52px;
  padding-right: 5px;
  color: #582e15;
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #e3c2af;
  outline: none;
  position: relative;
}

.textarea {
  color: #582e15;
  background: transparent;
  border: none;
  border-bottom: 1px solid #e3c2af;
  outline: none;
  width: 100%;
  height: 52px;
}

input:-webkit-autofill {
  background: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
/* Firefox */
input:-moz-autofill {
  background: transparent !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
}


input:-webkit-autofill:focus {
  background: transparent !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
}
</style>