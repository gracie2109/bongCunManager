<script setup lang="ts">
import { Notification } from '@/components/common';
import BaseAvatar from '@/components/common/BaseAvatar.vue';
import SwitchLang from '@/components/common/SwitchLang.vue';
import { PROVIDER_KEYS } from '@/lib/constants';
import { inject } from 'vue';

const expand = inject(PROVIDER_KEYS.IS_COLLAPSE)

</script>

<template>
    <div id="header" class="h-[53px] border fixed w-full bg-white  z-50">
        <div class="h-full mx-auto flex items-center px-5">
            <div class="flex justify-between w-full " :class="{ 'w-[80%]': !expand, 'w-[97%]': expand }">
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