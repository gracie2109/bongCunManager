<template>
  <div class="search-view grid grid-cols-3 gap-3">
    <div id="search_view--search" class="w-full col-span-2">
      <InputSearch :placeholder="props.placeholder" class="w-[1350px]" size="sm" />
    </div>

    <div>
      <TooltipProvider>
        <div class="flex items-center gap-2">
          <div id="filter">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">
                  <Filter color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent> filter </TooltipContent>
            </Tooltip>
          </div>
          <div id="eraser">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline" @click="$emit('clearFilter')">
                  <Eraser color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent> Eraser filter </TooltipContent>
            </Tooltip>
          </div>
          <div id="setting_column">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  variant="outline"
                  @click="
                    () => {
                      openSettingView = !openSettingView;
                    }
                  "
                >
                  <Columns2 color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View({{ openSettingView }}) </TooltipContent>
            </Tooltip>
          </div>
          <div id="eraser">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline" @click="clickAddNew">
                  <Plus color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent> Add new </TooltipContent>
            </Tooltip>
          </div>

          <div id="eraser">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">
                  <CloudUpload color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent> Export </TooltipContent>
            </Tooltip>
          </div>
          <div id="eraser">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button variant="outline">
                  <CloudDownload color="hsl(var(--primary))" />
                </Button>
              </TooltipTrigger>
              <TooltipContent> Import </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>

    <SettingColumnVisible
      :table="props.table"
      :openSettingView="openSettingView"
      @changeOpenSettingView="() => (openSettingView = !openSettingView)"
      
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import InputSearch from "./InputSearch.vue";
import {
  Filter,
  Eraser,
  Plus,
  CloudUpload,
  CloudDownload,
  Columns2,
} from "lucide-vue-next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
import { SettingColumnVisible } from "@/components/common";

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
const columns = computed(() =>
  props.table.getAllColumns().filter((column) => {
    return typeof column.accessorFn !== "undefined" && column.getCanHide();
  })
);

function clickAddNew() {
  if (props.addNew.type === "link") {
    router.push(props.addNew.content);
  } else {
    emit("setOpen");
  }
}
</script>
