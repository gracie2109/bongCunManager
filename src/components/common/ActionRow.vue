<template>
    <div class="flex items-stretch gap-3">

        <TooltipProvider>

            <template v-for="(i, j) in props.type" :key="j">
                <Tooltip v-if="i.isShow">
                    <TooltipTrigger as-child>
                        <Button variant="outline">
                            {{ renderIcon }}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{{ i.id }}</p>
                    </TooltipContent>
                </Tooltip>
            </template>
        </TooltipProvider>

    </div>
</template>


<script setup lang="ts">
import { computed, defineProps, h } from 'vue';
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-vue-next";
import type { Row } from '@tanstack/vue-table'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const props = defineProps<{
    row: Row<any>,
    type: {
        id: string,
        isShow: boolean
    }[]
}>()

const renderIcon = computed(() => {
    return props.type.map((i) => {
        if (i.id === "Delete") {
            return h(Trash)
        }
        if (i.id === "Edit") {
            return h(Edit)
        }
    })
})


</script>