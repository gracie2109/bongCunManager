<template>
  <div class="relative overflow-hidden w-200px">
    <!-- Main Card -->
    <div
      class="flex transition-transform duration-300 ease-in-out"
      :style="{
        transform: `translateX(${translateX}px)`,
        willChange: 'transform'
      }"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <!-- Card Content -->
      <div class="flex-shrink-0 w-200px bg-red-600 p-4 border-b">
        <h3 class="text-lg font-semibold">title</h3>
        <p class="text-gray-600">description</p>
      </div>

      <!-- Delete Section -->
      <div
        class="flex-shrink-0 w-24 bg-yellow-500 flex items-center justify-center text-white"
      >
        <span>Xóa</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const translateX = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const initialTranslateX = ref(0);

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

  // Giới hạn kéo sang phải tối đa 96px (chiều rộng của section xóa)
  if (translateX.value > 0) {
    translateX.value = 0;
  } else if (translateX.value < -96) {
    translateX.value = -96;
  }
};

const endDrag = () => {
  isDragging.value = false;

  // Nếu kéo quá 50% chiều rộng section xóa, tự động mở section xóa
  if (translateX.value < -48) {
    translateX.value = -96;
  } else {
    // Nếu không, đóng section xóa
    translateX.value = 0;
  }
};
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
