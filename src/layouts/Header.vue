<template>
  <div class="border-b bg-white h-14  fixed w-full z-[1000]">
   <div class="px-12 flex  h-full items-center justify-between">
       <AppLogo />
       <SwitchLang />
   </div>
  </div>
</template>

<script setup lang="ts">
import {SwitchLang, AppLogo} from "@/components/common"
</script>