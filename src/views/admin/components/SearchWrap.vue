<template>
    <div class=" fixed top-[3.75rem] p-3 border bg-white border-dashed ml-2 w-full"
        :class="clsx({
            '': isCollapsed,
            'text-red-300': !isCollapsed
        })"
    >
        <slot />
    </div>
</template>


<script lang="ts" setup>
import { PROVIDER_KEYS } from '@/lib/constants';
import clsx from 'clsx';
import { inject } from 'vue';

    const isCollapsed = inject(PROVIDER_KEYS.IS_COLLAPSE)
</script>