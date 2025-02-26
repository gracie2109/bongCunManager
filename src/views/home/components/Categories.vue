<script setup lang="ts">
import Section from "@/components/Section.vue";
import { INTRO_CATEGORIES } from "../constants";
</script>

<template>
  <Section class="relative categories">
    <h1
      class="text-center uppercase font-bold text-3xl  text-primary md:text-4xl  lg:text-4xl sm:text-3xl mb-8"
    >
      Danh mục sản phẩm
    </h1>
    <div class="relative h-full">
      <div
        class="flex justify-between overflow-x-auto gap-3 md:gap-4 h-full snap-x snap-mandatory custom-scrollbar pb-4"
      >
        <div
          v-for="(i, j) of INTRO_CATEGORIES"
          :key="j"
          class="flex-none first:pl-4 last:pr-4 cursor-pointer h-[150px]"
        >
          <div
            class="grid gap-3 p-3 w-[160px] sm:w-[180px] h-full md:w-[200px] place-content-center bg-[#F7C860] text-white rounded-md snap-start hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <div class="w-[80px] h-[80px] sm:w-[90px] mx-auto flex-shrink-0">
              <img
                :src="i.image"
                :alt="i.label"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p
              class="text-sm sm:text-sm md:text-base text-center font-medium flex-grow"
            >
              {{ i.label }}
            </p>
          </div>
        </div>

        <!-- <div
            class="grid gap-3 p-3 w-[160px] sm:w-[180px] h-full md:w-[200px] place-content-center bg-[#F7C860] text-white rounded-md snap-start hover:shadow-lg transition-all duration-300"
          >
            <div
              class="w-[80px] h-[80px] sm:w-[90px]  mx-auto"
            >
              <img
                :src="i.image"
                :alt="i.label"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p class="text-sm sm:text-sm md:text-base text-center font-medium">
              {{ i.label }}
            </p>
          </div> -->
      </div>
    </div>
  </Section>
</template>
<style scoped>

.categories {
  @apply relative;
}

@media (min-width: 900px) {
  .categories {
    top: 8rem;
  }
}
@media (max-width: 899px) {
  .categories {
    top: 12rem;
  }
}
</style>
