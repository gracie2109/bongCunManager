<template>
  <div class="w-full mt-5">
    <h1></h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
};
</script>
