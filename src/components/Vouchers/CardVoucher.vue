<template>
  <div
    class="flex bg-white   rounded-lg overflow-hidden w-full relative p-2"
  >
  
    <div
      class="bg-red-500 text-white p-4 flex flex-col items-center justify-center w-1/3 relative ticket-border"
    >

      <div class="text-sm mt-1 text-center">Toàn Ngành Hàng</div>
    </div>

    <div class="p-4 w-2/3 relative">
      <p class="text-md font-bold">
        Giảm {{ discount }} Giảm tối đa <span class="font-bold">{{ maxDiscount }}</span>
      </p>
      <p class="text-sm text-gray-700">Đơn Tối Thiểu {{ minOrder }}</p>
      <p v-if="validUntil" class="text-xs text-gray-500 mt-1">
        Có hiệu lực từ {{ validUntil }}
        <a href="#" class="text-blue-500 font-medium">Điều Kiện</a>
      </p>

      <button class="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-1 rounded">
        Lưu
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  discount: String,
  maxDiscount: String,
  minOrder: String,
  validUntil: String,
});
</script>

<style scoped>
/* Ticket Dotted Border Effect */
.ticket-border {
  position: relative;
}

.ticket-border::before,
.ticket-border::after {
  content: "";
  position: absolute;
  left: -6px;
  width: 12px;
  height: 100%;
  background: radial-gradient(circle, white 40%, transparent 41%);
  background-size: 12px 24px;
  background-position: center;
}
</style>
