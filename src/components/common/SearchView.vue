<template>
    <div class="search-view flex gap-3 w-full">
        <div id="search_view--search" class="flex-1 w-full">
            <InputSearch :placeholder="props.placeholder" class="w-[1350px]" size="sm" />
        </div>
        <div class="flex items-center gap-2">
            <div id="reset">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline" @click="$emit('reset')">
                                <RefreshCcw color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Reset </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div id="filter">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline">
                                <Filter color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> filter </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div id="eraser">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline" @click="$emit('clearFilter')">
                                <Eraser color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Eraser filter </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div id="eraser">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline" @click="clickAddNew">
                                <Plus color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Add new </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div id="eraser">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline">
                                <CloudUpload color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Export </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div id="eraser">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <Button variant="outline">
                                <CloudDownload color="hsl(var(--primary))" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent> Import </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import InputSearch from "./InputSearch.vue";
import {
    RefreshCcw,
    Filter,
    Eraser,
    Plus,
    CloudUpload,
    CloudDownload,
} from "lucide-vue-next";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogScrollContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Button from "../ui/button/Button.vue";
import { ref } from "vue";

const router = useRouter();
// const open = ref(false);

type Props = {
    placeholder: string;
    addNew: {
        type: "function" | "link";
        content: any;
    };
};
const props = defineProps<Props>();
const emit = defineEmits(["reset", "clearFilter", "addNew","setOpen"]);

function clickAddNew() {
    if (props.addNew.type === "link") {
        router.push(props.addNew.content);
    } else {
       emit('setOpen')
    }
}
</script>
