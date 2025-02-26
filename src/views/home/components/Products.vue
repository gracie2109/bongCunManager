<template>
  <div class="bg-[#bd994b] min-h-[550px] pt-5">
    <div class="container py-5">
      <h1
        class="text-center uppercase font-bold text-white text-3xl md:text-4xl lg:text-4xl sm:text-3xl mb-8"
      >
        {{ props.title }}
      </h1>

      <div id="products">
        <div
          v-if="props.data && props.data.length > 0"
          class="flex justify-between gap-4 product_list snap-x snap-mandatory pb-4 custom-scrollbar2 overflow-x-auto"
        >
          <div v-for="(i, j) in props.data" :key="j">
            <div class="bg-white rounded-md w-[300px] h-[400px] snap-start">
              <CardProduct :data="i" :key="j" show-border />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardProduct from "@/components/CardProduct.vue";

const props = defineProps<{
  title: string;
  data: any[];
}>();
</script>

<style scoped>






</style>
