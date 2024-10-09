<template>
  <div class="w-full space-y-3">
    <SearchWrap v-if="props.showSearch || props.showSearch === undefined">
      <SearchView
        v-if="
          props.addNewHandle && props.saveColumnVisible && props.headerAdvanced
        "
        placeholder="Search by store"
        @reset="() => $emit('onReset')"
        @clear-filter="() => $emit('clearFilter')"
        @setOpen="() => $emit('setOpen')"
        :addNew="props.addNewHandle"
        :table="table"
        :saveColumnVisible="props.saveColumnVisible"
        :headerAdvanced="props.headerAdvanced"
      />
    </SearchWrap>
    <slot name="content_header" />
    <div id="showTable" class="relative bg-white">
      <div class="bg-white space-y-6 relative">
        <Table>
          <TableHeader class="p-4 bg-primary">
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
                class="text-black font-bold"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :props="header.getContext()"
                  :render="header.column.columnDef.header"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="w-full h-full max-h-[100px] overflow-y-scroll">
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :props="cell.getContext()"
                    :render="cell.column.columnDef.cell"
                  />
                </TableCell>
              </TableRow>
            </template>

            <TableRow v-else>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div
        class="h-12 bg-white pl-5 bottom-0 max-w-[90vw] w-full fixed"
        v-if="props.pageCount && props.pageData"
      >
        <div class="w-full h-full grid place-items-center">
          <CustomPagination
            :total-record="pageCount || 0"
            :page-current="props.pageData ? props.pageData.pageIndex : 1"
            :page-size="props.pageData.pageSize"
            @onChange="(vl) => handleChangePage(vl)"
            @update-page-size="(vl: number) => $emit('updatePageSize', vl)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useVueTable,
  _getVisibleLeafColumns,
} from "@tanstack/vue-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
} from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { valueUpdater } from "@/lib/utils";
import { CustomPagination } from "@/components/common";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import SearchWrap from "@/views/admin/components/SearchWrap.vue";
import SearchView from "../SearchView.vue";
import { LOCAL_STORAGE_KEY } from "@/lib/constants";
import { type IHeaderAdvanced } from "@/types";
import PaginationEllipsis from "@/components/ui/pagination/PaginationEllipsis.vue";

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const rowSelection = ref({});
const columnVisibility = ref<VisibilityState>({});
type TAddNewHandle = {
  type: "function" | "link";
  content: null | string;
};
const props = defineProps<{
  data: any[];
  columns: ColumnDef<any>[];
  pageCount?: number;
  pageData?: PaginationState;
  saveColumnVisible?: {
    name: string;
    isRemeber: boolean;
  };
  headerAdvanced?: IHeaderAdvanced[];
  addNewHandle?: TAddNewHandle;
  showSearch?: boolean;
}>();

const emits = defineEmits([
  "handlePageChange",
  "onReset",
  "clearFilter",
  "setOpen",
  "updatePageSize",
]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});

async function handleChangePage(vl: number) {
  table.setPageIndex(vl);
  if (props.pageData) {
    props.pageData.pageIndex = vl;
    emits("handlePageChange", vl);
  }
}

const allColumns = computed(() => {
  return table.getAllColumns().filter((column) => {
    return typeof column.accessorFn !== "undefined" && column.getCanHide();
  });
});

function getColumnSettingLocal() {
  if (props.saveColumnVisible && props.saveColumnVisible.isRemeber) {
    const resLocal = localStorage.getItem(LOCAL_STORAGE_KEY.VISIBLE_COLUMN);
    const parseData = resLocal ? JSON.parse(resLocal) : null;
    if (parseData) {
      const savedColumns = parseData[props.saveColumnVisible.name];

      if (savedColumns) {
        const visibilityState = allColumns.value.reduce(
          (acc: any, column: any) => {
            acc[column.id] = savedColumns.includes(column.id);
            return acc;
          },
          {}
        );

        columnVisibility.value = visibilityState;
        table.setColumnVisibility(visibilityState);
        return;
      }
    }
  } else {
    const defaultVisibilityState = allColumns.value.reduce(
      (acc: any, column: any) => {
        acc[column.id] = true;
        return acc;
      },
      {}
    );

    columnVisibility.value = defaultVisibilityState;
    table.setColumnVisibility(defaultVisibilityState);
  }
}
onMounted(async () => {
  getColumnSettingLocal();
  table.setPageSize(Number(props.pageData && props.pageData.pageSize));
});

watchEffect(() => {
  if (props.saveColumnVisible && props.saveColumnVisible.isRemeber) {
    if (Object.keys(columnVisibility.value).length > 0) {
      table.setColumnVisibility(columnVisibility.value);
    }
  }
});
</script>
