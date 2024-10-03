<template>
  <Header>
    <h1 class="font-semibold flex items-center gap-2">
      <Container class="size-4 text-primary" />
      Suppliers ({{ pageCount }})
    </h1>
  </Header>
  <ContentWrap>
    <DataTable
      :headerAdvanced="headerAdvanced"
      :data="providers"
      :columns="columns"
      :page-count="pageCount"
      :page-data="pageData"
    
      :saveColumnVisible="{
        name: 'service_providers',
        isRemeber: false,
      }"
      @clear-filter="clearFilter"
      @on-reset="onReset"
      @clearFilter="clearFilter"
      @set-open="setOpen"
      @handle-page-change="loadDataForPage"
      @update-page-size="updatePageSize"
    />
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
import ServiceForm from "./components/Form.vue";
import { h, onMounted, reactive, ref, watchEffect } from "vue";
import { useServiceProvider } from "@/stores";
import { formatDateTime } from "@/lib/utils";
import { type IHeaderAdvanced, type T_ROW_FUNCTION } from "@/types";

import type { ColumnDef, PaginationState } from "@tanstack/vue-table";

import { storeToRefs } from "pinia";
import { DialogConfirm, ActionRow, DataTable } from "@/components/common";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/common/DataTable/DataTableColumnHeader.vue";
import { HEADER_ADVANCE_FUNCTION, INITIAL_PAGE_INDEX } from "@/lib/constants";
import { Container } from "lucide-vue-next";
import { watch } from "vue";

const store = useServiceProvider();
const { providers, pageCount } = storeToRefs(store);
const selectedItem = ref();

const mode = ref();
const rowEditSelected = ref();

const pageData = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: 5,
});

const columns: ColumnDef<any>[] = reactive([
  {
    accessorKey: "index",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "#" }),

    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("index")
      );
    },
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
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Phone Number" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        row.getValue("phone")
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Created At" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        formatDateTime(row.getValue("createdAt"))
      );
    },
  },
  {
    id: "function",
    accessorKey: "function",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Function" }),
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

const type = reactive<T_ROW_FUNCTION[]>([
  {
    id: "DELETE",
    isShow: true,
  },
  {
    id: "EDIT",
    isShow: true,
  },
]);

const headerAdvanced = reactive<IHeaderAdvanced[]>([
  HEADER_ADVANCE_FUNCTION.ADD_NEW,
  HEADER_ADVANCE_FUNCTION.SETTING_COLUMN,
])


const open = ref(false);

function handleActionRow({
  action,
  row,
}: {
  action: T_ROW_FUNCTION;
  row: any;
}) {
  if (action.isShow) {
    if (action.id === "DELETE") {
      deleteItem(row);
    }

    if (action.id === "EDIT") {
      open.value = true;
      rowEditSelected.value = row;
    }
  }
}

function deleteItem(val: any) {
  selectedItem.value = val;
  open.value = true;
  mode.value = "delete";
}
async function handleDelete() {
  await store.deleteServiceProvider(selectedItem.value.id);
  setOpen();
  selectedItem.value = null;
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


function updatePageSize (newPs:number) {
  pageData.value.pageSize = +newPs
}

const loadDataForPage = async (page: number) => {
  await store.getListServiceProvider({
    pageIndex: page,
    pageSize: pageData.value.pageSize,
  });
};

onMounted(async () => {
  await store.getListServiceProvider({
    pageIndex: pageData.value.pageIndex,
    pageSize: pageData.value.pageSize,
  });
});

watch(() => pageData.value.pageSize, async () => {
 await store.getListServiceProvider({
    pageIndex: pageData.value.pageIndex,
    pageSize: pageData.value.pageSize,
  });
})

</script>
