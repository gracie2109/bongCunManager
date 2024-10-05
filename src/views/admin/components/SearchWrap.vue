<template>
  <div
    class=" w-[93.5vw] p-3 border bg-white border-dashed"
    id="searchWrap"
    :class="{ 'w-[80%]': !expand}"
  >
   <slot />
  </div>
</template>

<script lang="ts" setup>
import { PROVIDER_KEYS } from "@/lib/constants";
import clsx from "clsx";
import { inject } from "vue";

const expand = inject(PROVIDER_KEYS.IS_COLLAPSE);
// fixed top-[3.75rem]
</script>
