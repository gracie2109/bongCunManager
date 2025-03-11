<template>
  <div class="relative overflow-hidden w-full h-full">
    <!-- Main Card -->
    <div ref="cardRef" class="flex transition-transform duration-300 ease-in-out w-full h-full" :style="{
      transform: `translateX(${translateX}px)`,
      willChange: 'transform'
    }" @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag"
      @touchmove="onDrag" @touchend="endDrag">
      <!-- Card Content -->
      <div class="flex-shrink-0 w-full border p-4">
        <slot name="content" />
      </div>

      <!-- Delete Section -->
      <div ref="swipeHiddenRef">
        <slot name="swipe_hidden"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";


const startX = ref(0);
const initialTranslateX = ref(0);
const cardRef = ref<HTMLElement | null>(null);
const swipeHiddenRef = ref<HTMLElement | null>(null);
const translateX = ref(0);
const isDragging = ref(false);
const velocity = ref(0);
const animationFrame = ref<number | null>(null);
const swipeHiddenWidth = ref(0);

const startDrag = (event: any) => {
  isDragging.value = true;
  startX.value = event.clientX;
  initialTranslateX.value = translateX.value;
};

const onDrag = (event: any) => {
  if (!isDragging.value) return;

  const currentX = event.clientX;
  const diffX = currentX - startX.value;
  translateX.value = initialTranslateX.value + diffX;

  // Giới hạn kéo sang phải tối đa 96px (chiều rộng của section xóa)
  if (translateX.value > 0) {
    translateX.value = 0;
  } else if (translateX.value < -swipeHiddenWidth.value) {
    translateX.value = -swipeHiddenWidth.value;
  }
};

const endDrag = () => {
  isDragging.value = false;

  // Nếu kéo quá 50% chiều rộng section xóa, tự động mở section xóa
  if (translateX.value < -swipeHiddenWidth.value / 2) {
    translateX.value = -swipeHiddenWidth.value;
  } else {
    // Nếu không, đóng section xóa
    translateX.value = 0;
  }
};


onMounted(() => {
  if (swipeHiddenRef.value) {
    swipeHiddenWidth.value = swipeHiddenRef.value.offsetWidth;
  }
});




</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
.w-200px {
  width: 200px;
}

/* Tối ưu hóa hiệu suất */
.transition-transform {
  will-change: transform;
}
</style>