<template>
    <div class="relative w-full h-full">
        <div class="w-full h-full">
            <!-- cart header -->
            <div class="border-b h-[50px] relative p-5">
                <div class="relative flex justify-between gap-4 items-center h-full">
                    <div @click="() => $router.push({ name: 'home' })" class="cursor-pointer">
                        <ArrowLeft color="hsl(var(--primary))" />
                    </div>
                    <div>
                        <span class="font-semibold text-xl"> Giỏ hàng </span>
                        <span>({{ carts.length }})</span>
                    </div>
                    <div class="w-[30px] mr-3 cursor-pointer" @click="edit = !edit">
                        {{ edit ? "Xong" : "Sửa" }}
                    </div>
                </div>
            </div>

            <!-- cart-content -->
            <div class="relative cart_mobile_content p-3 mt-5">
                <ScrollArea class="h-full">
                    <div v-for="i in carts.splice(0,1)" v-if="carts" :key="i.id" class="mb-3">
                        <CartItem :data="i"  />
                    </div>
                </ScrollArea>
            </div>

            <!-- cart footer -->
            <div class="absolute w-full border-t h-[70px] bottom-0">
                <div class="w-full h-full flex items-center justify-between ">
                    <!-- Choose all -->
                    <div class="pl-2 flex items-center w-[20%]">
                        <Checkbox id="all" @update:checked="chooseAll = !chooseAll" />
                        <label for="all" class="ml-1 cursor-pointer ">Tất cả</label>
                    </div>

                    <!-- total price -->
                    <div class="text-center flex flex-wrap gap-1 justify-center w-[50%]">
                        <p>Tổng thanh toán</p>
                        <p class="font-semibold text-primary ">{{ totalPay || formatPrice(0) }}</p>
                    </div>

                    <!-- Checkout  -->
                    <div
                        class="bg-primary-subb text-white h-full flex gap-1 flex-wrap items-center justify-center text-center font-semibold p-3 w-[30%]">
                        <p>Mua hàng</p>
                        <p>({{ selected.length || 0 }})</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeft } from "lucide-vue-next";
import { useCartLocal } from "@/stores";
import { storeToRefs } from "pinia";
import { Checkbox } from "@/components/ui/checkbox";
import { computed, ref, watch, watchEffect } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem.vue";

const $cart = useCartLocal();

const { carts, cartTotal } = storeToRefs($cart);

const edit = ref(false);
const chooseAll = ref(false);
const selected = ref<any[]>([]);
const totalPay = ref<any>();






const getValue = () => {
    if (!chooseAll.value || selected.value?.length > 0) {
        totalPay.value = formatPrice(0);
        selected.value = []
    } else {
        totalPay.value = cartTotal.value;
        selected.value = carts.value
    }
}
watchEffect(() => {
    getValue()
})
</script>

<style scoped>
.cart_mobile_content {
    height: calc(100vh - 140px);
}
</style>
