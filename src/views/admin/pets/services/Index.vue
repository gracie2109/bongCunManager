<template>
  <PageTitle />
  <ContentWrap>
    <div class="bg-white h-auto min-h-screen p-3">
      <DataTable
        :headerAdvanced="headerAdvanced"
        :data="petServices"
        :columns="columns"
        :page-count="pageCount"
        :page-data="pageData"
        :saveColumnVisible="{
          name: 'petServices',
          isRemeber: false,
        }"
        :add-new-handle="{
          content: null,
          type: 'function',
        }"
        :show-search="true"
        @clear-filter="clearFilter"
        @on-reset="onReset"
        @clearFilter="clearFilter"
        @set-open="setOpen"
        @handle-page-change="loadDataForPage"
        @update-page-size="updatePageSize"
      />
    </div>
  </ContentWrap>

  <DialogConfirm
    @change-open="
      () => {
        selectedItem = null;
        open = !open;
      }
    "
    :open="open && selectedItem && !rowEditSelected"
    :title="selectedItem?.name"
    @cancel="
      () => {
        selectedItem = null;
        open = false;
      }
    "
    @handleOk="handleDelete"
  />

  <ModalCreateService
    :title="$t('common.create')"
    :handle-open="open && !selectedItem"
    @updateOpen="(vl) => (open = vl)"
    :rowEditting="rowEditSelected"
  />
</template>

<script lang="ts" setup>
import { ContentWrap } from "@/views/admin/components";

import { h, onMounted, reactive, ref, watchEffect } from "vue";
import { usePetServices } from "@/stores";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { type IHeaderAdvanced, type T_ROW_FUNCTION } from "@/types";
import type { ColumnDef, PaginationState } from "@tanstack/vue-table";

import { storeToRefs } from "pinia";
import { DialogConfirm, DataTable } from "@/components/common";
import DataTableColumnHeader from "@/components/common/DataTable/DataTableColumnHeader.vue";
import { HEADER_ADVANCE_FUNCTION, INITIAL_PAGE_INDEX } from "@/lib/constants";
import { watch } from "vue";
import RowFunction from "../components/RowFunction.vue";
import PageTitle from "../PageTitle.vue";
import ModalCreateService from "../components/ModalCreateService.vue";
import { contents as unit, type } from "@/data/pet-service.json";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const store = usePetServices();
const { petServices, pageCount } = storeToRefs(store);
const selectedItem = ref();
const rowEditSelected = ref();
const mode = ref();

const pageData = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: 500,
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
    accessorKey: "type",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Type" }),
    cell: ({ row }) => {
      const slT = row.getValue("type") as string;
      const petType = type.find((i) => i.id === slT)?.lang as any;

      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        petType[locale.value]
      );
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Unit" }),
    cell: ({ row }) => {
      const slT = row.getValue("unit") as string;
      const petType = (unit.find((i) => i.id === slT)?.lang as any) || "";

      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        petType[locale.value]
      );
    },
  },
  {
    accessorKey: "generalPrice",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "General Price" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        formatPrice(row.getValue("generalPrice") || "")
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
      h(RowFunction, {
        row,
        onClick: (item: any) => {
          handleActionRow(item);
        },
      }),
  },
]);

const headerAdvanced = reactive<IHeaderAdvanced[]>([
  HEADER_ADVANCE_FUNCTION.SETTING_COLUMN,
  HEADER_ADVANCE_FUNCTION.ADD_NEW,
]);

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
  await store.deletePetService(selectedItem.value.id);
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

function updatePageSize(newPs: number) {
  pageData.value.pageSize = +newPs;
}

const loadDataForPage = async (page: number) => {
  await store.getListPetService({
    pageIndex: page,
    pageSize: pageData.value.pageSize,
  });
};

onMounted(async () => {
  await store.getListPetService({
    pageIndex: pageData.value.pageIndex,
    pageSize: pageData.value.pageSize,
  });
});

watch(
  () => pageData.value.pageSize,
  async () => {
    await store.getListPetService({
      pageIndex: pageData.value.pageIndex,
      pageSize: pageData.value.pageSize,
    });
  }
);
</script>
