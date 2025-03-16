<template>
  <div class="relative">
    <b class="inline-block flex-1">Phương thức thanh toán</b>

    <div>
      <div v-for="i of method" :key="i.id" class=" h-[60px]  rounded-lg ">
        <div class="w-full h-full flex gap-3 items-center">
            <input type="radio" checked/>
           <div>
            <img
              :src="i.image"
              :alt="i.name"
              class="w-[50px] h-[50px] object-contain bg-transparent"
            />
           </div>
          <div class=" flex-1">
           <p class=""> {{ i.name }}</p>
           <p class="text-xs">{{ i.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import iconShipCod from "@/assets/ship_cod.svg";
import { RadioGroupItem } from "@/components/ui/radio-group";
const method = ref([
  {
    id: "1",
    name: "Thanh toán khi giao hàng (COD)",
    image: iconShipCod,
    desc: "Vui lòng thanh toán cho shiper khi nhận hàng",
  },
]);
</script>
