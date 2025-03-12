<template>
  <div class="relative overflow-hidden w-full h-full">
    <!-- Main Card -->
    <div
      ref="cardRef"
      class="flex transition-transform duration-300 ease-in-out w-full h-full"
      :style="{
        transform: `translateX(${translateX}px)`,
        willChange: 'transform'
      }"
    >
      <!-- Card Content -->
      <div class="flex-shrink-0 w-full border p-4">
        <slot name="content" />
      </div>

      <!-- Delete Section -->
      <div ref="swipeHiddenRef" @click.stop="handleSwipeHiddenClick">
        <slot name="swipe_hidden"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useGesture } from "@vueuse/gesture";

const props = defineProps<{
  isOpen: boolean;
  click: boolean
   // Trạng thái đóng/mở từ component cha
}>();

const emit = defineEmits(['updateOpen', 'swipe-hidden-click']);

const cardRef = ref<HTMLElement | null>(null);
const swipeHiddenRef = ref<HTMLElement | null>(null);
const translateX = ref(0);
const isDragging = ref(false);
const velocity = ref(0);
const animationFrame = ref<number | null>(null);
const swipeHiddenWidth = ref(0);

// Theo dõi thay đổi của isOpen và cập nhật translateX
watch(
  () => props.isOpen,
  () => {
    translateX.value = props.isOpen ? -swipeHiddenWidth.value : 0;
  }
);



console.log('__', props.isOpen, translateX.value, isDragging.value,swipeHiddenWidth.value )

// Xử lý click vào swipe_hidden
const handleSwipeHiddenClick = (event: MouseEvent) => {
  event.stopPropagation(); // Ngăn chặn sự kiện click lan ra toàn bộ card
  emit('swipe-hidden-click'); // Phát ra sự kiện
};

// Sử dụng useGesture để xử lý kéo
useGesture(
  {
    onDrag: ({ movement: [mx], dragging, vxvy: [vx] }) => {
      isDragging.value = dragging;
      translateX.value = mx;
      if (dragging) {
        velocity.value = vx;
      } else {
        // Khi thả tay, thông báo cho component cha để cập nhật isOpen
        if (translateX.value < -swipeHiddenWidth.value / 2) {
          emit('updateOpen', true); // Mở section xóa
        } else {
          emit('updateOpen', false); // Đóng section xóa
        }
        velocity.value = vx;
      }
    },
  },
  {
    domTarget: cardRef,
    eventOptions: { passive: true },
  }
);

console.log('translateX.value', translateX.value)
console.log('swipeHiddenWidth.value', swipeHiddenWidth.value)

onMounted(() => {
  if (swipeHiddenRef.value) {
    swipeHiddenWidth.value = swipeHiddenRef.value.offsetWidth;
  }
});

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