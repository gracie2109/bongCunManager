<template>
  <!--  <AppHeader/>-->
  <div class="app_xcontent">
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout" v-if="isOnline">
        <component :is="Component" :key="curRoute.fullPath" />
      </component>
      <div v-else><ServerOffline /></div>
    </router-view>
  </div>
  <div class="absolute right-0 top-36 z-[9999] border">
    <Toaster position="top-right" rich-colors />
  </div>
</template>

<script lang="ts" setup>
import { Toaster } from "@/components/ui/sonner";
import {
  computed,
  defineAsyncComponent,
  markRaw,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores";
import ServerOffline from "./components/ServerOffline.vue";

const layouts = new Map();


function getLayout(name: string) {
  if (layouts.get(name)) return layouts.get(name);
  const layout = markRaw(
    defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`))
  );
  layouts.set(name, layout);
  return layout;
}

const route = useRoute();
const appStore = useAppStore();
const isOnline = ref();
const Layout = computed(() => {
  if (!route?.matched?.length) return null;
  else {
    return getLayout((route?.meta?.layout as string) || appStore.layout);
  }
});

function getStatus() {
  const stt = navigator.onLine;
  isOnline.value = stt;
}
onMounted(() => {
  window.addEventListener("online", () => getStatus());
  window.addEventListener("offline", () => getStatus());
});

watchEffect(() => {
  getStatus();
});
</script>
