<script setup lang="ts">
import ContentWrap from "../components/ContentWrap.vue";
import { Cog } from "lucide-vue-next";
import Header from "../components/Header.vue";
import { reactive, ref, defineAsyncComponent, computed } from "vue";

const PermissionView = defineAsyncComponent(
  () => import("./permissions/Index.vue")
);

const RoleView = defineAsyncComponent(() => import("./roles/Index.vue"));

const tabs = reactive([
  {
    id: 1,
    name: "permissions",
    component: PermissionView,
  },
  {
    id: 2,
    name: "roles",
    component: RoleView,
  },
]);
const currentTab = ref(tabs[0].id);
const currentTabComponent = computed(() => {
  const selected = tabs.find((i) => i.id === currentTab.value);
  return selected?.component;
});
</script>

<template>
  <Header>
    <h1 class="font-semibold flex items-center gap-2">
      <Cog class="size-4 text-primary" />
      Settings
    </h1>
  </Header>
  <ContentWrap>
    <div class="relative top-10 bg-white min-h-dvh p-5">
      <div>
        <transition-group name="fade" tag="div" class="flex gap-3">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="w-[140px] inline-flex"
            :class="{
              'border-b border-red-500': currentTab === tab.id,
            }"
            @click="currentTab = tab.id"
          >
            <span
              class="text-center w-[80%] pb-2 text-sm mx-auto font-semibold capitalize text-muted-foreground"
              :class="{
                'text-primary': currentTab === tab.id,
              }"
            >
              {{ tab.name }}
            </span>
          </button>
        </transition-group>
        <div class="w-full mt-3">
          <keep-alive>
            <Suspense>
              <transition name="fade" mode="out-in">
                <component
                  :is="currentTabComponent"
                  :key="currentTab"
                ></component>
              </transition>
              <template #fallback>Loading...</template>
            </Suspense>
          </keep-alive>
        </div>
      </div>
    </div>
  </ContentWrap>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
