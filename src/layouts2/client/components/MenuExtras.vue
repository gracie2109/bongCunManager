<template>
  <div class="flex items-center gap-x-2 md:gap-x-4 will-change-auto ">

    <div class="hidden lg:block">
      <SwitchLang />
    </div>

    <Separator class="hidden !h-5 lg:block  z-[10]" orientation="vertical" />
     <CartMenu :type="String(route.name)" />
    <div v-if="user" class=" z-[10]">
      <BaseAvatar :user="user" />
    </div>
    <div v-else class=" z-[10] cursor-pointer">
      <p @click="open = !open">Login</p>
    </div>
    
    <MenuButton @toggle-menu="emit('toggleMenu')" />
  </div>

  <Dialog :open="open" @update:open="open = !open">
     <DialogContent  class="w-[calc(100vw-10rem)] h-[550px]">
        <LoginView v-if="!component || component?.includes('login')" @directPath="directPath" @close-dialog="() => open = !open"/>
        <RegisterView v-else @directPath="directPath"/>
     </DialogContent>
  
  </Dialog>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { SwitchLang } from "@/components/common";
import MenuButton from "../components/MenuButton.vue";
import CartMenu from "./CartMenu.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { getLocalStorage } from "@/lib/utils";
import {BaseAvatar} from "@/components/common";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {computed, defineAsyncComponent, markRaw, ref, defineComponent} from "vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

const emit = defineEmits(["toggleMenu"]);
const route = useRoute();
const component = ref<string | null>(null)
const user = JSON.parse(getLocalStorage('auth'));
const open = ref(false);



const directPath = (value: any) => {
  component.value = value
}
</script>
