<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { computed, ref, shallowRef } from 'vue'

const target = shallowRef<HTMLElement | null>(null)
const container = shallowRef<HTMLElement | null>(null)
const containerWidth = computed(() => container.value?.offsetWidth || 1)
const overlayWidth = computed(() => containerWidth.value * 0.3)
const right = ref('-30%')
const opacity = ref(0)
const isVisible = ref(false)

function reset() {
  right.value = '-30%'
  opacity.value = 0
  isVisible.value = false
}

function handleOverlayClick() {
  console.log('Overlay clicked!');
  
}

const { lengthX } = useSwipe(container, {
  passive: false,
  onSwipe() {
    if (!isVisible.value && lengthX.value > 0) {
      // Kéo từ trái qua phải để mở
      const length = Math.min(lengthX.value, overlayWidth.value)
      right.value = `${-30 + (length / overlayWidth.value) * 30}%`
      opacity.value = length / overlayWidth.value
    } else if (isVisible.value && lengthX.value < 0) {
      // Kéo từ phải qua trái để đóng
      const length = Math.min(Math.abs(lengthX.value), overlayWidth.value)
      right.value = `${-(length / overlayWidth.value) * 30}%`
      opacity.value = 1 - length / overlayWidth.value
    }
  },
  onSwipeEnd() {
    if (!isVisible.value && lengthX.value > overlayWidth.value / 2) {
      right.value = '0%'
      opacity.value = 1
      isVisible.value = true
    } else if (isVisible.value && lengthX.value < -overlayWidth.value / 2) {
      reset()
    }
  }
})
</script>

<template>
  <div ref="container" class="container select-none">
    <button @click="reset">Reset</button>
    <div ref="target" class="overlay" :class="{ animated: true }" :style="{ right, opacity, width: '30%' }" @mousedown="handleOverlayClick">
      <p>Hidden Content</p>
    </div>
    <p class="status">
      Swipe right to reveal content, swipe left to hide
    </p>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 150px;
  border: 2px dashed #ccc;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.overlay {
  position: absolute;
  top: 0;
  right: -30%;
  width: 30%;
  height: 100%;
  background: #3fb983;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  pointer-events: auto; /* Đảm bảo phần tử nhận sự kiện click */
}

.overlay.animated {
  transition: all 0.3s ease-in-out;
}
</style>