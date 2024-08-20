<template>
  <div class="w-full flex gap-3 relative">
    <div id="left_menu" class="max-w-[250px] w-[250px] mt-6  min-h-lvh">
      <MenuAdmin/>
    </div>
    <div id="right_menu" class="min-h-dvh relative w-full">
      <div class="relative">
        <div class="flex justify-between items-center gap-4 absolute">
          <div class="border-b w-full border borde-red-600 pb-3 fixed bg-white z-[900] flex justify-between items-center gap-x-4">
            <div class="mt-6 border-l-4 border-l-purple-950 pl-6  text-xl font-bold relative">
              <blockquote>
                {{ $t(`pageMeta.${key}`) }}
              </blockquote>
            </div>
          </div>
        </div>
        <div class="mt-10 relative top-5 z-[800]">
          <div class=" w-full h-full min-h-fit relative px-3 pt-5">
            <div class="card">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {MenuAdmin} from "."
import {useRoute} from "vue-router"
import {computed} from "vue";

const route = useRoute();
const key = computed(() => route.meta.key);
</script>


<style scoped>
.card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
}
</style>