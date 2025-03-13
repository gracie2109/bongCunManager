<template>
  <div class="w-full flex h-full gap-2 relative box-border">
    <div class="first_sc w-[40%]">
      <div class="grid grid-cols-5 w-full h-full">
        <div class="my-auto">
          <Checkbox
            :checked="props.isSelected"
            @update:checked="updateChecked"
          />
        </div>
        <div class="w-full h-full col-span-4">
          <img
            :src="props.data.image || props.data.images[0]"
            alt=""
            class="w-full h-full object-cover rounded-sm relative"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <div class="w-[60%]">
      <div class="w-full h-full relative">
        <div class="h-[50%] relative">
          <p class="text-md line-clamp-2 truncate text-ellipsis">
            {{ props.data.name }}
          </p>
          <span class="text-[12px]" v-if="props.data.variant">
            {{ props.data.variant }}
          </span>
        </div>

        <div class="flex relative gap-2 items-baseline">
          <div class="w-[40%] h-[90%]">
            <NumberField
              :default-value="props.data.quantity || 1"
              :min="1"
              @update:model-value="
                (v) => {
                  changeQuanty(v);
                }
              "
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
          <div class="w-auto">
            {{ formatPrice(props.data.quantity * props.data.price || 0) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatPrice } from "@/lib/utils";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";
import { Checkbox } from "@/components/ui/checkbox";

const props = defineProps<{
  data: any;
  isSelected: boolean;
}>();

const emits = defineEmits(["deleteCartItem", "updateQuanty", "updateChecked"]);

const changeQuanty = (vl: number) => {
  emits("updateQuanty", vl, props.data.id);
};

const updateChecked = () => {
  emits("updateChecked", props.data);
};
</script>

<style scoped></style>
