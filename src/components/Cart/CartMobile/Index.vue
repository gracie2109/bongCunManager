<template>
  <div class="relative w-full h-full">
    <div class="w-full h-full">
      <!-- cart header -->
      <div class="border-b h-[50px] relative p-5">
        <div class="relative flex justify-between gap-4 items-center h-full">
          <div
            @click="() => $router.push({ name: 'home' })"
            class="cursor-pointer"
          >
            <ArrowLeft color="hsl(var(--primary))" />
          </div>
          <div>
            <span class="font-semibold text-xl"> Giỏ hàng </span>
            <span>({{ carts.length }})</span>
          </div>
          <div
            class="w-[30px] mr-3 cursor-pointer"
            @click="
              () => {
                if (carts.length > 0) {
                  edit = !edit;
                }
              }
            "
          >
            <span
              :class="{
                'text-white': carts.length < 1,
              }"
              >{{ edit ? "Xong" : "Sửa" }}</span
            >
          </div>
        </div>
      </div>

      <!-- cart-content -->
      <div class="relative cart_mobile_content p-3 mt-5">
        <ScrollArea class="h-full">
          <div
            v-for="i in carts"
            v-if="carts.length > 0"
            :key="i.id"
            class="mb-3"
          >
            <CartItem
              :isSelected="selected?.some((record) => record.id === i.id)"
              :data="i"
              @delete-item="deleteCartItem"
              @updateChecked="selectedItem"
              :isEditOpen="edit"
            />
          </div>

          <div v-else>
            <div class="h-full mt-5 grid">
              <div class="container my-auto relative">
                <img :src="cartEmpty" alt="" />
                <p class="text-center">Empty cart</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- cart footer -->
      <div class="absolute w-full border-t h-[70px] bottom-0" v-if="!edit">
        <div class="w-full h-full flex items-center justify-between">
          <!-- Choose all -->
          <div class="pl-2 flex items-center w-[26%]">
            <Checkbox
              id="all"
              :checked="
                carts.length > 0 &&
                (chooseAll || selected.length === carts.length)
              "
              @update:checked="chooseAll = !chooseAll"
              :disabled="carts.length < 1"
            />
            <label for="all" class="ml-1 cursor-pointer">Tất cả</label>
          </div>

          <!-- total price -->
          <div class="text-center flex flex-wrap gap-1 justify-center w-[46%]">
            <p>Tổng thanh toán</p>
            <p class="font-semibold text-primary">
              {{ totalPay || formatPrice(0) }}
            </p>
          </div>

          <!-- Checkout  -->
          <div
            @click="gotoCheckout"
            class="bg-primary-subb text-white h-full flex gap-1 flex-wrap items-center justify-center text-center font-semibold p-3 w-[28%]"
            :class="{
              'cursor-default bg-slate-500':
                carts.length < 1 || selected.length < 1,
            }"
          >
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
import { ref, watch, watchEffect } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem.vue";
import cartEmpty from "../../../assets/empty-box.png";
import { useRouter } from "vue-router";

const $cart = useCartLocal();
const { carts, cartTotal } = storeToRefs($cart);

const edit = ref(false);
const chooseAll = ref(false);
const selected = ref<any[]>([]);
const totalPay = ref<any>();
const router = useRouter();
// Cập nhật danh sách selected khi carts thay đổi
watch(
  carts,
  (newCarts) => {
    selected.value = selected.value
      .map((item) => {
        const updatedItem = newCarts.find((c) => c.id === item.id);
        return updatedItem ? { ...item, quantity: updatedItem.quantity } : null;
      })
      .filter(Boolean);
    calcTotalPay();
  },
  { deep: true }
);

const calcTotalPay = () => {
  const res = selected.value.reduce(
    (acc, curr) => acc + (+curr.price * +curr.quantity || 0),
    0
  );
  totalPay.value = formatPrice(res);
};

const deleteCartItem = (id: string) => {
  $cart.deleteCartItem(id);
  selected.value = selected.value.filter((i) => i.id !== id);
  calcTotalPay();
};

const selectedItem = (item: any) => {
  const index = selected.value.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(item);
  }
  calcTotalPay();
};

const toggleChooseAll = () => {
  if (chooseAll.value) {
    selected.value = carts.value.slice();
  } else {
    selected.value = [];
  }
  calcTotalPay();
};

const gotoCheckout = () => {
  if (selected.value.length < 1 || carts.value.length < 1) {
    return;
  }

  router.push({ name: "checkout" });
  $cart.addToCheckoutList(selected.value);
};
watch(chooseAll, toggleChooseAll);
</script>

<style scoped>
.cart_mobile_content {
  height: calc(100vh - 140px);
}
</style>
