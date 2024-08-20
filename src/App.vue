<script lang="ts" setup>
import {AppHeader} from "@/layouts";
import {Toaster} from '@/components/ui/sonner';
</script>

<template>
  <AppHeader/>
  <div class="app_content relative top-16 z-[998] px-12">
    {{ $t("nav.home") }}
    <RouterView/>
  </div>
  <div class="absolute right-0 top-36 z-[9999] border">
    <Toaster :duration="2000" position="top-right" rich-colors/>
  </div>
</template>
