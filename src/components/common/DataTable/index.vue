<template>
  <div class="w-full">
    <SearchWrap>
      <SearchView
        placeholder="Search by store"
        @reset="() => $emit('onReset')"
        @clear-filter="() => $emit('clearFilter')"
        @setOpen="() => $emit('setOpen')"
        :addNew="{
          type: 'function',
          content: null,
        }"
        :table="table"
        :saveColumnVisible="props.saveColumnVisible"
      />
    </SearchWrap>
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
      <div class="h-20 bg-white pl-5 bottom-0 max-w-[95vw] w-full fixed">
        <div class=" h-full grid justify-start">
          <CustomPagination
            :total-record="pageCount"
            :page-current="pageData.pageIndex"
            :page-size="pageData.pageSize"
            @onChange="(vl) => handleChangePage(vl)"
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

import { setLocalStorage, valueUpdater } from "@/lib/utils";
import { CustomPagination } from "@/components/common";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import SearchWrap from "@/views/admin/components/SearchWrap.vue";
import SearchView from "../SearchView.vue";

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const columns2 = ref<VisibilityState>({});

const props = defineProps<{
  data: any[];
  columns: ColumnDef<any>[];
  pageCount: number;
  pageData: PaginationState;
  saveColumnVisible: {
    name: string;
    isRemeber: boolean;
  };
}>();

const emits = defineEmits([
  "handlePageChange",
  "onReset",
  "clearFilter",
  "setOpen",
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
    valueUpdater(updaterOrValue, columns2),
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
      return columns2.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});

async function handleChangePage(vl: number) {
  table.setPageIndex(vl);
  props.pageData.pageIndex = vl;
  emits("handlePageChange", vl);
}

const allColumns = computed(() => {
  return table.getAllColumns().filter((column) => {
    return typeof column.accessorFn !== "undefined" && column.getCanHide();
  });
});

function getColumnSettingLocal() {
  if (props.saveColumnVisible.isRemeber) {
    const resLocal = localStorage.getItem("visibleColumn");
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

        columns2.value = visibilityState;
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

    columns2.value = defaultVisibilityState;
    table.setColumnVisibility(defaultVisibilityState);
  }
}
onMounted(async () => {
  getColumnSettingLocal();
  table.setPageSize(Number(props.pageData.pageSize));
});

watchEffect(() => {
  if (props.saveColumnVisible.isRemeber) {
    if (Object.keys(columns2.value).length > 0) {
      table.setColumnVisibility(columns2.value);
    }
  }
});
</script>
