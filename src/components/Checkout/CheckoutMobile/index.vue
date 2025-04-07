<template>
  <div class="relative w-full h-full" v-if="checkoutList && checkoutList.length > 0">
    <div
      id="checkout_address"
      class="relative rounded-md mt-3 shadow-sm h-[80px]"
    >
      <AddressForm />
    </div>

    <div class="relative max-h-[80vh] h-auto overflow-y-auto mt-8 px-3 border  mb-16">
      <div v-for="i in checkoutList" v-if="checkoutList" class="checkout_list">
        <CartSimple :data="i" :showEditor="false" />
      </div>

        <ShippingMethod 
          :leadtime="leadtime"
          :shippingFee="shippingFee"
        />

        <PaymentMethod />
        <VoucherList />





    </div>
    <div
      class="total_checkout fixed bottom-0 w-full  h-[60px]  bg-white"
    >
     <div class="p-3 flex justify-end gap-4 ">
      <p>
        Tổng thanh tóa <span class="font-bold text-xl text-primary">{{ formatPrice(shippingFee + totalCheckoutPrice) }}</span>
      </p>
      <Button @click="handleCheckout">Đặt hàng</Button>
     </div>

    </div>
  </div>

  <div v-else>
    Chojn 
  </div>
</template>

<script lang="ts" setup>
import AddressForm from "@/components/Checkout/CheckoutMobile/components/AddressForm.vue";
import ShippingMethod from "@/components/Checkout/CheckoutMobile/components/ShippingMethod.vue";

import CartSimple from "@/components/Cart/CartSimple.vue";
import { useAuthStore, useCartLocal } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { formatPrice } from "@/lib/utils";
import { calcShippingFee, getLeadTime } from "@/services/shipment.service";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import PaymentMethod from "./components/PaymentMethod.vue";
import VoucherList from "./components/VoucherList.vue";

const $cart = useCartLocal();
const $auth = useAuthStore();

const { checkoutList } = storeToRefs($cart);
const shippingFee = ref(0)
const leadtime = ref();


const totalCheckoutPrice = computed(() => {
  if (checkoutList.value.length > 0) {
    const total = checkoutList.value.reduce(
      (acc: any, curr: any) => (acc || 0) + (+curr.price * +curr.quantity || 0),
      0
    );
    return total;
  }
});


const { userAddress } = storeToRefs($auth);

const handleCheckout = () => {
  alert('checkout')
}


onMounted(async () => {
  const data = await getLeadTime();
  const selectedAddress = userAddress.value.find((i) => i.is_default);

  const fee = await calcShippingFee({
    shippingInfo: {
      districtId: selectedAddress?.district_id,
      wardCode: selectedAddress?.ward_code,
    },
    storeInfo: {
      districtId: 1442,
      wardCode: "21211",
    },
    orderInfo: {
      length: 30,
      width: 40,
      height: 20,
      weight: 3000,
    },
    items: [
      {
        name: "TEST1",
        quantity: 1,
        length: 200,
        width: 200,
        height: 100,
        weight: 100,
      },
    ],
  });
  shippingFee.value= fee?.total
  leadtime.value = format(new Date(data * 1000), "dd/MM");
});


</script>
