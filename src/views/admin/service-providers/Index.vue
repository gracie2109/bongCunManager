<template>
  <Header> list store header </Header>

  <SearchWrap>
  
    <SearchView
      placeholder="Search by store"
      @reset="onReset"
      @clear-filter="clearFilter"
      @setOpen="setOpen"
      :addNew="{
        type: 'function',
        content: null,
      }"
      :table="table"
    />
  </SearchWrap>
  <ContentWrap>

    <div id="showTable">
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :props="header.getContext()"
                  :render="header.column.columnDef.header"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="w-full">
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
    </div>
  </ContentWrap>
  <ServiceForm
     @change-open="() => (open = !open)" 
     :open="open && !selectedItem"
     :rowEditting="rowEditSelected"
     
      />
  <DialogConfirm
    @change-open="
      () => {
        selectedItem = null;
        open = !open;
      }
    "
    :open="open && selectedItem"
    :title="selectedItem?.name"
    @cancel="
      () => {
        selectedItem = null;
        open = false;
      }
    "
    @handleOk="handleDelete"
  />
</template>

<script lang="ts" setup>
import { Header, ContentWrap } from "@/views/admin/components";
import SearchView from "@/components/common/SearchView.vue";
import SearchWrap from "../components/SearchWrap.vue";
import ServiceForm from "./components/Form.vue";
import { h, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useServiceProvider } from "@/stores";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
} from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useProductStore } from "@/stores";
import { storeToRefs } from "pinia";
import { valueUpdater } from "@/lib/utils";
import { CustomButton, DialogConfirm, ActionRow } from "@/components/common";
import { Trash } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";

import DataTableColumnHeader from "@/components/common/DataTable/DataTableColumnHeader.vue";
const store = useServiceProvider();
const { loading, providers } = storeToRefs(store);
const selectedItem = ref();
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const mode = ref()
const productStore = useProductStore();
const rowEditSelected = ref()


const columns: ColumnDef<any>[] = reactive([
  {
    id: "select",
    enableHiding: false,
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
  },
  {
    id: "index",
    enableHiding: false,

    header: ({ column }) => h(DataTableColumnHeader, { column, title: "INDEX" }),

    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("index")
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("name")
      );
    },
  },
  {
    accessorKey: "desc",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Desc" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("desc")
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone Number" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("phone")
      );
    },
  },
  {
    id: "function",
    header: "",
    cell: ({ row }) =>
      h(ActionRow, {
        row,
        type: type,
        onClick: (item: any) => {
          handleActionRow(item);
        },
      }),
  },
]);

type RowType = {
  id: string;
  isShow: boolean;
};
const type = reactive<RowType[]>([
  {
    id: "Delete",
    isShow: true,
  },
  {
    id: "Edit",
    isShow: true,
  },
]);
const open = ref(false);

function handleActionRow({ action, row }: { action: RowType; row: any }) {
  if (action.isShow) {
    if (action.id === "Delete") {
      deleteItem(row);
    }

    if(action.id === "Edit"){
        open.value = true;
        rowEditSelected.value = row
    }
  }
}

const table = useVueTable({
  get data() {
    return providers;
  },
  get columns() {
    return columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
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



function deleteItem(val: any) {
  selectedItem.value = val;
  open.value = true;
  mode.value="delete";

}
async function handleDelete() {
  await store.deleteServiceProvider(selectedItem.value.id);
  setOpen();
  selectedItem.value = null
}

function onReset() {
  alert("reset");
}
function clearFilter() {
  alert("clearFilter");
}
function setOpen() {
  open.value = !open.value;
}

onMounted(async () => {
  await store.getListServiceProvider();
});
</script>
