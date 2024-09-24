<template>
  <div class="search-view grid grid-cols-3 gap-3 w-full">
    <div id="search_view--search" class="w-full col-span-2">
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
      <div id="setting_column">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" @click="() => {
                  openSettingView = !openSettingView;
                }
                ">
                <Columns2 color="hsl(var(--primary))" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View({{ openSettingView }}) </TooltipContent>
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
    <Dialog :open="openSettingView" @update:open="() => (openSettingView = !openSettingView)">
      <DialogContent class="w-96 p-0 max-h-[90dvh]">
        <DialogHeader class="p-6 pb-0">
          <DialogTitle> {{ $t("common.settingView") }}</DialogTitle>
        </DialogHeader>

        <div class="grid gap-4 py-4 overflow-y-auto px-6">
          <div v-for="(i, j) in columns" :key="j" class="flex gap-3 items-center">
            <Checkbox :id="i.id" :checked="i.getIsVisible()" @update:checked="(value) => i.toggleVisibility(!!value)" />
            <label :for="i.id" class="cursor-pointer capitalize">{{ i.id }}</label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
  Columns2,
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import type { Table } from "@tanstack/vue-table";
import { computed } from "vue";
import DataViewOption from "./DataTable/DataViewOption.vue";
import { Checkbox } from "@/components/ui/checkbox";

const router = useRouter();
const openSettingView = ref(false);

type Props = {
  placeholder: string;
  addNew: {
    type: "function" | "link";
    content: any;
  };
  table: Table<any>;
};

const props = defineProps<Props>();
const emit = defineEmits(["reset", "clearFilter", "addNew", "setOpen"]);
const columns = computed(() => props.table.getAllColumns()
  .filter(
    column =>{
      console.log('column', column);
      return typeof column.accessorFn !== 'undefined' && column.getCanHide()
    }
      
  ))



function clickAddNew() {
  if (props.addNew.type === "link") {
    router.push(props.addNew.content);
  } else {
    emit("setOpen");
  }
}
</script>
