<template>
  <div class="search-view grid grid-cols-3 gap-3">
    <div id="search_view--search" class="w-full col-span-2">
      <InputSearch
        :placeholder="props.placeholder"
        size="sm"
        @on-input="(vl) => $emit('onInput', vl)"
      />
    </div>

    <div class="col-span-1">
      <!-- {{ rangeDate }} -->

      <div>
        <TooltipProvider>
          <div class="flex items-center gap-2">
           <div 
           v-if="
                props.headerAdvanced.includes(HEADER_ADVANCE_FUNCTION.RANGE_DATE)
              "
           
           >
            <SearchRangeTime
              :range-date="date"
              @change-date="handleChangeDate"
            />
           </div>
            <div v-if="props.buttonFunctions">
              <Suspense>
                <div v-if="props.buttonFunctions">
                  <component
                    :is="props.buttonFunctions"
                    :key="buttonFunctions"
                  ></component>
                </div>
              </Suspense>
            </div>
            <div
              id="filter"
              v-if="
                props.headerAdvanced.includes(HEADER_ADVANCE_FUNCTION.FILTER)
              "
            >
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline">
                    <Filter color="hsl(var(--primary))" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> filter </TooltipContent>
              </Tooltip>
            </div>
            <div
              id="eraser"
              v-if="
                props.headerAdvanced.includes(HEADER_ADVANCE_FUNCTION.RESET)
              "
            >
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" @click="$emit('clearFilter')">
                    <Eraser color="hsl(var(--primary))" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Eraser filter </TooltipContent>
              </Tooltip>
            </div>
            <div
              id="setting_column"
              v-if="
                props.headerAdvanced.includes(
                  HEADER_ADVANCE_FUNCTION.SETTING_COLUMN
                )
              "
            >
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
                <TooltipContent>View </TooltipContent>
              </Tooltip>
            </div>
            <div
              id="addNew"
              v-if="
                props.headerAdvanced.includes(
                  HEADER_ADVANCE_FUNCTION.ADD_NEW
                ) && props.addNew.type
              "
            >
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline" @click="clickAddNew">
                    <Plus color="hsl(var(--primary))" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Add new </TooltipContent>
              </Tooltip>
            </div>
            <div
              id="export"
              v-if="
                props.headerAdvanced.includes(HEADER_ADVANCE_FUNCTION.EXPORT)
              "
            >
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="outline">
                    <CloudUpload color="hsl(var(--primary))" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> Export </TooltipContent>
              </Tooltip>
            </div>
            <div
              id="import"
              v-if="
                props.headerAdvanced.includes(HEADER_ADVANCE_FUNCTION.IMPORT)
              "
            >
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
        :saveColumnVisible="props.saveColumnVisible"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from "vue";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import type { Table } from "@tanstack/vue-table";
import { SettingColumnVisible } from "@/components/common";
import { type IHeaderAdvanced } from "@/types";
import { HEADER_ADVANCE_FUNCTION, TIME_OPTIONS } from "@/lib/constants";
import SearchRangeTime from "./SearchRangeTime.vue";

const router = useRouter();
const openSettingView = ref(false);

type Props = {
  placeholder: string;
  addNew: {
    type: "function" | "link";
    content: any;
  };
  table: Table<any>;
  saveColumnVisible: {
    name: string;
    isRemeber: boolean;
  };
  headerAdvanced: IHeaderAdvanced[];
  buttonFunctions: any;
};

const props = defineProps<Props>();

const date = ref(TIME_OPTIONS[0]["value"]);

const emit = defineEmits([
  "reset",
  "clearFilter",
  "addNew",
  "setOpen",
  "onInput",
  "changeDate",
]);

function clickAddNew() {
  if (props.addNew.type === "link") {
    router.push({ name: props.addNew.content });
  } else {
    emit("setOpen");
  }
}

function handleChangeDate(val: any) {
  emit("changeDate", val);
}
</script>
