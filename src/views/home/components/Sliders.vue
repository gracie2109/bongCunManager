<template>
  <div class="slider-wrap relative">
    <img 
      :src="dfData[0]" 
      alt="" 
      class="w-full object-cover h-[300px] sm:h-[300px] md:h-[500px] lg:h-[600px] xl:h-[650px]" 
    /> 
  </div>
</template>

<script lang="ts" setup>
const settings = {
  dots: true,
  dotsClass: "slick-dots custom-dot-class",
  edgeFriction: 0.35,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const dfData = [
  "https://pethaven.vn/source/imges/z5818919278146_3c03b397957744fe8820f0d96337856a.jpg",
  // "https://media-iot.digotech.net/uploads/carbon_website/BANNER_HOME.jpg"
];
</script>

<style>
.slider-wrap {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}
</style>