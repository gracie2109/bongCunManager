<template>
  <div class="relative overflow-hidden w-full h-full rounded-sm">
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{
        transform: `translateX(${translateX}px)`,
        willChange: 'transform',
      }"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <div class="flex-shrink-0 w-full text-black h-[115px]">
      {{ isEditOpen }}
        <CartContent
          :data="props.data"
          :isSelected="props.isSelected"
          @update-checked="updateChecked"
          @update-quanty="changeQuanty"
        />
      </div>

      <div
        ref="actionRef"
        class="flex-shrink-0 w-24 bg-red-600 flex items-center justify-center text-white"
        @click="handleClickDel"
      >
        <span>Xóa</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import CartContent from "./CartContent.vue";
import { useCartLocal } from "@/stores";

const props = defineProps<{
  data: any;
  isSelected: boolean;
  isEditOpen: boolean;
}>();
const $cart = useCartLocal();
const emits = defineEmits(["deleteItem", "updateChecked"]);

const translateX = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const initialTranslateX = ref(0);
const actionRef = ref<HTMLElement | null>(null);
const actionWidth = ref(0);

const startDrag = (event: any) => {
  isDragging.value = true;
  startX.value = event.clientX || event.touches[0].clientX;
  initialTranslateX.value = translateX.value;
};

const onDrag = (event: any) => {
  if (!isDragging.value) return;

  const currentX = event.clientX || event.touches[0].clientX;
  const diffX = currentX - startX.value;
  translateX.value = initialTranslateX.value + diffX;

  if (translateX.value > 0) {
    translateX.value = 0;
  } else if (translateX.value < -actionWidth.value) {
    translateX.value = -actionWidth.value;
  }
};

const endDrag = () => {
  isDragging.value = false;

  if (translateX.value < -actionWidth.value / 2) {
    translateX.value = -actionWidth.value;
  } else {
    translateX.value = 0;
  }
};

onMounted(() => {
  if (actionRef.value) {
    actionWidth.value = actionRef.value.offsetWidth;
  }
});

const handleClickDel = () => {
  $cart.deleteCartItem(props.data);
};
const changeQuanty = (vl: number) => {
  $cart.updateQuanty(+vl, props.data.id);
};

const updateChecked = () => {
  emits("updateChecked", props.data);
};

watch(
  () => props.isEditOpen,
  (newVal) => {
    if (props.isEditOpen) {
      translateX.value = -actionWidth.value;
    } else {
      translateX.value = 0;
    }
  }
);
</script>

<style scoped>
.shadow_cs {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.transition-transform {
  will-change: transform;
}
</style>
