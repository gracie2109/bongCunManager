<template>
  <div class="w-full flex h-[100px] border rounded-sm relative box-border">
    <div class="image w-[30%] p-2 relative">
      <img
        :src="props.data.image || props.data.images[0]"
        alt=""
        class="w-full h-full object-cover rounded-sm relative"
        loading="lazy"
      />
    </div>

    <div class="w-[70%] relative">
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

      <div class="absolute -top-2 -right-1 cursor-pointer bg-red-600 p-1 w-[20px] h-[20px] rounded-full" @click="handleClick">
        <Trash2 class="text-white bg-transparent w-full h-full" />
      </div>
    </div>
  </div>

  <DialogConfirm
    :open="isClick"
    :ok-btn="'Delete'"
    :desc="'You may be deleting user data. After you delete this, it can not be recovered.'"
    :title="'Delete files'"
    @handle-ok="handleDelete"
    @cancel="
      () => {
        isClick = false;
      }
    "
  />
</template>

<script lang="ts" setup>
import { formatPrice } from "@/lib/utils";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Trash2 } from "lucide-vue-next";
import DialogConfirm from "../common/ConfirmDialog.vue";
import { ref } from "vue";

const props = defineProps<{
  data: any;
}>();
const emits = defineEmits(["deleteCartItem", "updateQuanty"]);

const isClick = ref(false);

const handleClick = () => {
  isClick.value = true;
};

const handleDelete = () => {
  emits("deleteCartItem", props.data);
};
const changeQuanty = (vl: number) => {
  emits("updateQuanty", vl, props.data.id);
};

</script>

<style scoped></style>
