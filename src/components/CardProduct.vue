<template>
  <div
    class="p-3 w-full h-full relative group-hover overflow-hidden hover:shadow-xl rounded-md"
    :class="{ border: props.showBorder }"
  >
    <div class="h-full relative">
      <div class="h-full relative">
        <div class="relative h-[60%] w-full">
          <div class="card_images relative w-full h-full">
            <img
              :src="props.data.images[0]"
              alt=""
              class="w-full h-full object-scale-down"
            />
          </div>

          <div
            class="text-black space-y-3 px-3 absolute w-full h-full bottom-0 hidden hover_section"
          >
            <div class="grid gap-2 pt-8">
              <div class="grid h-12 justify-end gap-1">
                <div
                  class="bg-white border rounded-full flex items-center px-3 py-1 gap-1.5 cursor-pointer group transition"
                  @click="() => quickWatch()"
                >
                  <p
                    class="hidden group-hover:block group-hover:transition-all group-hover:duration-300"
                  >
                    Xem nhanh
                  </p>
                  <Eye class="size-6 group-hover:ml-1" />
                </div>
              </div>

              <div class="grid h-12 justify-end gap-1">
                <div
                  class="bg-white border rounded-full flex items-center px-3 py-1 gap-1.5 cursor-pointer group transition"
                  @click="() => addToWhistlist()"
                >
                  <p
                    class="hidden group-hover:block group-hover:transition-all group-hover:duration-300"
                  >
                    Thêm vào yêu thích
                  </p>
                  <Heart class="size-6 group-hover:ml-1" />
                </div>
              </div>
            </div>
            <div
              class="bg-red-600 text-white h-12 border-red-600 mt-28 text-center font-semibold cursor-pointer"
              @click="() => addToCart()"
            >
              <div class="w-full h-full grid place-content-center">
                Mua ngay
              </div>
            </div>
          </div>
        </div>
        <div class="card_content h-[40%] grid mt-2 gap-4">
          <div class="h-[55px]">
            <p
              class="font-semibold text-xl h-full line-clamp-2 overflow-hidden cursor-pointer"
            >
              {{ props.data.name }}
            </p>
          </div>
          <div>
            <p class="font-bold text-sm mb-1">{{ props.data.category }}</p>
            <template v-if="!!props.data.sale_price">
              <div class="flex w-full gap-4 items-center">
                <p class="line-through">{{ formatPrice(props.data.price) }}</p>
                <p class="text-xl font-bold text-primary">
                  {{ formatPrice(props.data.sale_price) }}
                </p>
              </div>
            </template>

            <template v-else>
              <p>{{ formatPrice(props.data.price) }}</p>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-3 left-3 flex gap-2">
      <div class="sale_tag bg-primary w-18" v-if="props.data.sale_price">
        <div class="px-2 py-1 text-[12px] text-white">Giảm giá</div>
      </div>
    </div>
  </div>

  <Dialog :open="open" @update:open="() => (open = !open)">
    <DialogContent
      class="sm:max-w-[425px] lg:max-w-[60%] h-[650px] overflow-y-scroll"
    >
      <div class="py-5 relative">
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 relative"
        >
          <div class="image h-[300px] md:h-full">
            <img
              :src="props.data.images[0]"
              alt=""
              class="w-full h-full object-contain"
            />
          </div>
          <div class="relative">
            <div class="card_content grid mt-2 gap-4 relative">
              <div class="h-[70px] relative">
                <p
                  class="font-semibold text-2xl h-full line-clamp-2 overflow-hidden"
                >
                  {{ props.data.name }}
                </p>
              </div>
              <div class="space-y-1 my-5 relative">
                <p>
                  Thương hiệu:
                  <span class="cursor-pointer">{{
                    props.data.brand || "NAN"
                  }}</span>
                </p>
                <p>
                  Kho hàng:
                  <span class="cursor-pointer">{{
                    props.data.stock || "Đang cập nhật"
                  }}</span>
                </p>
                <p>
                  Loại sản phẩm:
                  <span class="cursor-pointer">{{
                    props.data.stock || "Đang cập nhật"
                  }}</span>
                </p>
              </div>
              <div class="relative">
                <template v-if="!!props.data.sale_price">
                  <div class="flex w-full gap-4 items-center h-full">
                    <p class="line-through">
                      {{ formatPrice(props.data.price) }}
                    </p>
                    <p class="text-xl font-bold text-primary">
                      {{ formatPrice(props.data.sale_price) }}
                    </p>
                  </div>
                </template>

                <template v-else>
                  <p>{{ formatPrice(props.data.price) }}</p>
                </template>
              </div>
            </div>
            <div class="grid gap-3 mt-12">
              <div class="flex gap-3">
                <Button
                  variant="black"
                  class="text-xl w-[90%] bg-zinc-950 h-14"
                  @click="() => addToCart()"
                  >Thêm vào giỏ hàng</Button
                >
                <Button
                  class="w-[10%] h-full text-xl"
                  @click="() => addToWhistlist()"
                >
                  <Heart />
                </Button>
              </div>

              <Button class="w-full text-xl h-14" @click="() => buyNow()"
                >Mua ngay</Button
              >
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { formatPrice } from "@/lib/utils";
import { Eye, Heart } from "lucide-vue-next";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ref } from "vue";
import Button from "./ui/button/Button.vue";
const props = defineProps<{
  data: any;
  showBorder: boolean;
}>();

const open = ref<boolean>(false);

const addToCart = () => {
  alert("add to cart");
};
const addToWhistlist = () => {
  alert("add to whist list");
};
const quickWatch = () => {
  open.value = !open.value;
};
const buyNow = () => {
  alert("buyNow");
};
</script>

<style scoped>
.group-hover:hover .hover_section {
  display: block;
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
    height: 100%;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.hover_section {
  transition: all 0.3s ease;
}
</style>
