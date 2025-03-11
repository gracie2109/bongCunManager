<template>
  <div class="relative overflow-hidden w-200px">
    <!-- Main Card -->
    <div ref="cardRef" class="flex transition-transform duration-300 ease-in-out"
      :style="{ transform: `translateX(${translateX}px)` }">
      <!-- Card Content -->
      <div class="flex-shrink-0 w-200px bg-red-600 p-4 border-b">
        <h3 class="text-lg font-semibold">title</h3>
        <p class="text-gray-600">description</p>
      </div>

      <!-- Delete Section -->
      <div class="flex-shrink-0 w-24 bg-yellow-500 flex items-center justify-center text-white">
        <span>Xóa</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGesture } from '@vueuse/gesture';

const cardRef = ref<HTMLElement | null>(null); // Tham chiếu đến card
const translateX = ref(0); // Giá trị dịch chuyển theo trục X
const isDragging = ref(false); // Trạng thái kéo
const velocity = ref(0); // Tốc độ kéo
const animationFrame = ref<number | null>(null); // ID của requestAnimationFrame

// Hàm cập nhật vị trí card
const updatePosition = () => {
  if (isDragging.value) return; // Không cập nhật nếu đang kéo

  // Áp dụng quán tính
  translateX.value += velocity.value;

  // Giới hạn dịch chuyển
  if (translateX.value > 0) {
    translateX.value = 0;
    velocity.value = 0;
  } else if (translateX.value < -96) {
    translateX.value = -96;
    velocity.value = 0;
  }

  // Giảm tốc độ dần
  velocity.value *= 0.9;

  // Dừng animation khi tốc độ đủ nhỏ
  if (Math.abs(velocity.value) < 0.1) {
    velocity.value = 0;
  } else {
    animationFrame.value = requestAnimationFrame(updatePosition);
  }
};

// Sử dụng useGesture để xử lý kéo
const gesture = useGesture(
  {
    onDrag: ({ movement: [mx], dragging, vxvy: [vx] }) => {
      isDragging.value = dragging;
      translateX.value = mx; // Cập nhật giá trị dịch chuyển

      if (dragging) {
        velocity.value = vx; // Cập nhật tốc độ kéo
      } else {
        // Khi thả tay, tự động đóng/mở section xóa
        if (translateX.value < -48) {
          translateX.value = -96; // Mở section xóa
        } else {
          translateX.value = 0; // Đóng section xóa
        }
        velocity.value = vx; // Áp dụng quán tính
        animationFrame.value = requestAnimationFrame(updatePosition);
      }
    },
  },
  {
    domTarget: cardRef, // Áp dụng cho card
    eventOptions: { passive: true }, // Tối ưu hiệu suất
  }
);

// Hủy animation khi component unmount
onUnmounted(() => {
  if (animationFrame.value !== null) {
    cancelAnimationFrame(animationFrame.value);
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
