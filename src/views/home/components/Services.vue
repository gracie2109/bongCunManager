<template>
  <div id="services-wrap" class="relative">
    <div
      class="shadow-md absolute w-full h-auto min-h-20 -top-24 bg-white"
    >
      <div
        id="service-content"
        class="flex flex-wrap gap-4 justify-around items-center w-full h-full p-4 md:p-6"
      >
        <div
          v-for="(i, j) of INTRO_SERVICES"
          :key="j"
          class="flex items-center gap-2 w-full sm:w-1/2 md:w-[45%] lg:w-auto"
        >
          <img :src="i.image" :alt="i.label" class="w-8 h-8 md:w-10 md:h-10" />
          <p class="text-sm md:text-base">{{ i.label }}</p>
        </div>
      </div>
    </div>
    <div class="clear-both"></div>
  </div>
</template>

<script lang="ts" setup>
import { INTRO_SERVICES } from "../constants";
</script>
