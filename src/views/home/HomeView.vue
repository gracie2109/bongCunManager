<script lang="ts" setup>
import Banner from "./components/Sliders.vue";
import Services from "./components/Services.vue";
import Categories from "./components/Categories.vue";
import Products from "./components/Products.vue";
import { rawProducts } from "./constants";
import CardProduct from "@/components/CardProduct.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import Footer from "@/components/Footer.vue";
</script>
<template>
  <div>
    <Banner />
    <div class="container relative">
      <div class="relative">
        <Services />
      </div>

      <div class="relative mb-5">
        <Categories />
      </div>
    </div>

    <div class="mt-[15rem] space-y-16">
      <div class="bg-[#bd994b] min-h-[550px] pt-5">
        <div class="container py-5">
          <h1
            class="text-center uppercase font-bold text-white text-3xl md:text-4xl lg:text-4xl sm:text-3xl mb-8"
          >
            Sản phẩm được yêu thích
          </h1>

          <div id="products">
            <div
              v-if="rawProducts && rawProducts.length > 0"
              class="flex justify-between gap-4 product_list snap-x snap-mandatory pb-4 custom-scrollbar2 overflow-x-auto"
            >
              <div v-for="(i, j) in rawProducts" :key="j">
                <div class="bg-white rounded-md w-[300px] h-[400px] snap-start">
                  <CardProduct :show-border="false" :data="i" :key="j" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:container">
        <div class="min-h-[550px] pt-5 w-full">
          <div class="container py-5">
            <h1
              class="text-center uppercase font-bold text-3xl md:text-4xl lg:text-4xl sm:text-3xl mb-8"
            >
              Sản phẩm được yêu thích
            </h1>

            <div id="products">
              <div
                v-if="rawProducts && rawProducts.length > 0"
                class="flex justify-between gap-4 product_list snap-x snap-mandatory pb-4 custom-scrollbar overflow-x-auto"
              >
                <div v-for="(i, j) in rawProducts" :key="j">
                  <div
                    class="bg-white rounded-md w-[300px] h-[400px] snap-start"
                  >
                    <CardProduct show-border :data="i" :key="j" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative" id="home_register">
      <RegisterForm />
    </div>

    <Footer />
  </div>
</template>
