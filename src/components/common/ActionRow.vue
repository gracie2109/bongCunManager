<template>
    <div class="flex items-stretch gap-3">
        <TooltipProvider>
            <template v-for="(item, index) in props.type" :key="index">
                <Tooltip v-if="item.isShow">
                    <TooltipTrigger as-child>
                        <Button variant="outline" @click="handleClick(item)">
                            <component :is="getIcon(item.id)" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ item.id }}</p>
                    </TooltipContent>
                </Tooltip>
            </template>
        </TooltipProvider>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, toRaw } from 'vue';
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-vue-next";
import type { Row } from '@tanstack/vue-table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
const emits = defineEmits(['click'])
const props = defineProps<{
    row: Row<any>,
    type: {
        id: string,
        isShow: boolean
    }[]
}>();

const getIcon = (id: string) => {
    switch (id) {
        case "Delete":
            return Trash;
        case "Edit":
            return Edit;
        default:
            return null; // Or a default icon
    }
};


function handleClick(item: any) {
    emits('click', { action: toRaw(item), row: toRaw(props.row.original) })
}

</script>
