<template>
  <div class="relative overflow-hidden w-200px">
    <!-- Main Card -->
    <div
      ref="cardRef"
      class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <!-- Card Content -->
      <div class="flex-shrink-0 w-200px bg-red-500 p-4 border-b">
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
import { useGesture } from "@vueuse/gesture";
import { useTransition } from "@vueuse/core";


    const cardRef = ref(null); // Tham chiếu đến card
    const translateX = ref(0); // Giá trị dịch chuyển theo trục X

    // Sử dụng useGesture để xử lý kéo
    useGesture(
      {
        onDrag: ({ movement: [mx], dragging }) => {
          if (dragging) {
            translateX.value = mx; // Cập nhật giá trị dịch chuyển
          } else {
            // Khi thả tay, tự động đóng/mở section xóa
            if (translateX.value < -48) {
              translateX.value = -96; // Mở section xóa
            } else {
              translateX.value = 0; // Đóng section xóa
            }
          }
        }
      },
      {
        domTarget: cardRef, // Áp dụng cho card
        eventOptions: { passive: true } // Tối ưu hiệu suất
      }
    );

    const smoothTranslateX = useTransition(translateX, {
      duration: 300, // Thời gian chuyển động
      transition: [0.25, 0.1, 0.25, 1] // Easing function
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
