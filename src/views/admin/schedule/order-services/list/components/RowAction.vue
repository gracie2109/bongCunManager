<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <Button variant="ghost" @click="
                $router.push({
                    name: 'detailOrderScheduleDetail',
                    params: { id: row.original.id },
                })
                ">
                <Settings class=" size-6 text-primary" />
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            {{ $t("pageMeta.settingPetServicePrice") }}
        </TooltipContent>
    </Tooltip>
</template>

<script lang="ts" setup>
import { ActionRow } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { T_ROW_FUNCTION } from "@/types";
import type { Row } from "@tanstack/vue-table";
import { EllipsisVertical, Settings } from "lucide-vue-next";
import { reactive } from "vue";

const props = defineProps<{
    row: Row<any>;
}>();
const emits = defineEmits(["click"]);

function handleEmit({ action, row }: { action: T_ROW_FUNCTION; row: any }) {
    emits("click", { action, row });
}
</script>
