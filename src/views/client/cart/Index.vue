<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";
import { useCartLocal } from "@/stores";
import { storeToRefs } from "pinia";
import { Checkbox } from "@/components/ui/checkbox";
import CartMobile from "@/components/Cart/CartMobile/Index.vue";

const $cart = useCartLocal();

const { carts, cartTotal } = storeToRefs($cart);
</script>

<template>
  <div class="w-full h-screen">
    <div class="block sm:hidden w-full h-full relative">
      <CartMobile />
    </div>

    <div class="hidden xs:block">
      <p>Updating..</p>
      <p>Support mobile now</p>
    </div>
  </div>
</template>
