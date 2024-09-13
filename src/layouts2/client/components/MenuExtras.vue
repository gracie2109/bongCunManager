<template>
  <div class="flex items-center gap-x-2 md:gap-x-4 will-change-auto ">

    <div class="hidden lg:block">
      <SwitchLang />
    </div>
    <CartMenu :type="String(route.name)" />
    <button class="flex items-center gap-x-2 z-[10]" type="button" >
      <Search :size="20" stroke-width="1.5" />
    </button>

    <Separator class="hidden !h-5 lg:block  z-[10]" orientation="vertical" />
    <div v-if="user" class=" z-[10]">
      <BaseAvatar :user="user" />
    </div>
    <div v-else class=" z-[10]">
      <router-link :to="$router.resolve({ name: 'login' })">Login</router-link>
    </div>
    <MenuButton @toggle-menu="emit('toggleMenu')" />

  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { SwitchLang } from "@/components/common";
import { Search } from "lucide-vue-next"
import MenuButton from "../components/MenuButton.vue";
import CartMenu from "./CartMenu.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { getLocalStorage } from "@/lib/utils";
import {BaseAvatar} from "@/components/common"

const emit = defineEmits(["toggleMenu"]);
const route = useRoute();

const user = JSON.parse(getLocalStorage('auth'));

</script>
