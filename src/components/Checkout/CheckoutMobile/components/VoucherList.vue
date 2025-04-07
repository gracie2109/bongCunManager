<template>
    <div class="flex flex-wrap justify-center gap-4 w-full ">
      <VoucherCard
        v-for="(voucher, index) in vouchers"
        :key="index"
        :discount="voucher.discount"
        :max-discount="voucher.maxDiscount"
        :min-order="voucher.minOrder"
        :used="voucher.used"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import VoucherCard from "@/components/Vouchers/CardVoucher.vue";
  
  const vouchers = ref([
    {
      discount: "15%",
      maxDiscount: "₫1tr",
      minOrder: "₫2tr",
      used: null, // No usage data for this one
    },
    {
      discount: "15%",
      maxDiscount: "₫150k",
      minOrder: "₫500k",
      used: "98%",
    },
    {
      discount: "15%",
      maxDiscount: "₫100k",
      minOrder: "₫100k",
      used: "97%",
    },
  ]);
  </script>
  