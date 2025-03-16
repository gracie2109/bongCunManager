<template>
  <div class="block sm:hidden">
    <CheckoutMobile />
  </div>
</template>

<script lang="ts" setup>
import { useCartLocal } from "@/stores";
import { storeToRefs } from "pinia";
import CheckoutMobile from "@/components/Checkout/CheckoutMobile/index.vue";

const $store = useCartLocal();
const { checkoutList } = storeToRefs($store);
</script>
