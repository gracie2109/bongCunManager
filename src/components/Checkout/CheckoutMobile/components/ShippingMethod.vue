<template>
  <div class="relative">
    <div class="header flex items-center">
      <b class="inline-block flex-1">Phương thức vận chuyển</b>
    </div>
    <div class="border rounded-md p-3">
      <div class="flex justify-between">
        <p class="flex-1">Giao hàng nhanh</p>
        <p>{{formatPrice(props.shippingFee) }}</p>
      </div>

      <p>Thời gian đảm bảo nhận hàng {{ props.leadtime }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatPrice } from "@/lib/utils";

const props = defineProps<{
  leadtime:any,
  shippingFee:any
}>()
</script>
