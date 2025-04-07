<template>
  <div
    class="w-full grid grid-cols-8 gap-1 items-start"
    v-if="selectedAddress"
  >
    <div class="address_icon col-span-1 flex justify-center">
      <img :src="iconAddress" alt="iconAddress" class="w-5 h-5" />
    </div>
    <div class="content col-span-6">
      <div class="address_name_phone flex gap-3">
        <div class="flex-1 truncate font-semibold">
          {{ selectedAddress.name }}
        </div>
        <span>
          {{ selectedAddress.phone_number }}
        </span>
      </div>
      <div class="text-sm ">
        <p>{{ selectedAddress.address_title }}</p>
        <p>{{ selectedAddress.specific_address }}</p>
    </div>
    </div>
    <div class="address_navigation col-span-1 m-auto">
      <ArrowRight class="text-[gray]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores";
import iconAddress from "@/assets/iconLocation.png";
import { ArrowRight } from "lucide-vue-next";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const $store = useAuthStore();
const { userAddress } = storeToRefs($store);
const selectedAddress = computed(() =>
  userAddress.value.find((i) => i.is_default)
);
</script>
