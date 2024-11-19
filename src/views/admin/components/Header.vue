<script setup lang="ts">
import { Notification } from "@/components/common";
import BaseAvatar from "@/components/common/BaseAvatar.vue";
import SwitchLang from "@/components/common/SwitchLang.vue";
</script>

<template>
  <div id="header" class="h-[53px] border fixed bg-white z-50 w-[98.5vw]">
    <div class="h-full mx-auto flex items-center px-5">
      <div class="flex justify-between w-full">
        <div>
          <slot />
        </div>
        <div class="flex gap-6 items-stretch">
          <Notification />
          <SwitchLang />
          <BaseAvatar />
        </div>
      </div>
    </div>
  </div>
</template>
