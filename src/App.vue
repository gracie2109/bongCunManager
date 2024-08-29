<template>
  <!--  <AppHeader/>-->
  <div class="app_xcontent">
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <component :is="Component" :key="curRoute.fullPath"/>
      </component>
    </router-view>
  </div>
  <div class="absolute right-0 top-36 z-[9999] border">
    <Toaster  position="top-left" rich-colors/>
  </div>
</template>


<script lang="ts" setup>
import {Toaster} from '@/components/ui/sonner';
import {computed, defineAsyncComponent, markRaw} from "vue";
import {useRoute} from "vue-router";
import {useAppStore} from "@/stores"

const layouts = new Map();

function getLayout(name: string) {
  if (layouts.get(name))
    return layouts.get(name)
  const layout = markRaw(defineAsyncComponent(() => import(`@/layouts2/${name}/index.vue`)))
  layouts.set(name, layout)
  return layout
}


const route = useRoute();
const appStore = useAppStore()

const Layout = computed(() => {
  if (!route?.matched?.length) return null;
  else {
    return getLayout((route?.meta?.layout as string) || appStore.layout);
  }
})
</script>