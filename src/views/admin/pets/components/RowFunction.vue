<template>
    <ActionRow :type="type" :row="props.row" @click="$emit('click')">
        <Tooltip>
            <TooltipTrigger as-child>
                <Button variant="ghost" @click="$router.push({ name: 'settingPetServicePrice' })">
                    <Settings class="size-6 text-primary" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                {{ $t('pageMeta.settingPetServicePrice') }}
            </TooltipContent>
        </Tooltip>





    </ActionRow>
</template>

<script lang="ts" setup>
import { ActionRow } from "@/components/common";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import type { T_ROW_FUNCTION } from "@/types";
import type { Row } from "@tanstack/vue-table";
import { reactive } from "vue";
import { Eye } from "lucide-vue-next";
import { Settings } from 'lucide-vue-next';

const props = defineProps<{
    row: Row<any>;
}>();
const emits = defineEmits(["click"]);

const type = reactive<T_ROW_FUNCTION[]>([
    {
        id: "DELETE",
        isShow: true,
    },
    {
        id: "EDIT",
        isShow: true,
    },
]);
</script>
