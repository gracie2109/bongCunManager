<template>
  <Header>
    <h1 class="font-semibold flex items-center gap-2">Service Combo</h1>
  </Header>

  <ContentWrap>
    <div class="bg-white min-h-svh p-5 space-y-6">
      <DataTable
        :headerAdvanced="headerAdvanced"
        :data="listCombo"
        :columns="columns"
        :page-count="pageCount"
        :page-data="pageData"
        :saveColumnVisible="{
          name: 'petCombo',
          isRemeber: true,
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

      <ServiceComboForm
        :form="form"
        :open="open"
        @changeOpen="reset"
        :rowEditting="rowEditting"
      />
    </div>
  </ContentWrap>
</template>

<script lang="ts" setup>
import ContentWrap from "../../components/ContentWrap.vue";
import Header from "../../components/Header.vue";
import { h, onMounted, reactive, ref, watch } from "vue";
import ServiceComboForm from "./ServiceComboForm.vue";
import { useForm } from "vee-validate";
import { usePetCombo } from "@/stores";
import { storeToRefs } from "pinia";
import type { ColumnDef, PaginationState } from "@tanstack/vue-table";
import DataTableColumnHeader from "@/components/common/DataTable/DataTableColumnHeader.vue";
import { convertNumberToTime, formatDateTime, formatPrice } from "@/lib/utils";
import type { IHeaderAdvanced, T_ROW_FUNCTION } from "@/types";
import { HEADER_ADVANCE_FUNCTION, INITIAL_PAGE_INDEX } from "@/lib/constants";
import { DataTable } from "@/components/common";
import { status, manualStatus } from "@/data/status.json";
import { useI18n } from "vue-i18n";
import RowFunction from "../components/RowFunction.vue";
const { locale } = useI18n();

const store = usePetCombo();
const open = ref(false);
const form = useForm();
const { listCombo, loading, pageCount } = storeToRefs(store);
const rowEditting = ref();

const headerAdvanced = reactive<IHeaderAdvanced[]>([
  HEADER_ADVANCE_FUNCTION.SETTING_COLUMN,
  HEADER_ADVANCE_FUNCTION.ADD_NEW,
]);

const pageData = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: 500,
});

function reset() {
  open.value = !open.value;
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
    accessorKey: "price",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Price" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        formatPrice(row.getValue("price"))
      );
    },
  },
  {
    accessorKey: "estimateTime",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Estimate Time" }),
    cell: ({ row }) => {
      return h(
        "span",
        { class: "max-w-[500px] truncate font-medium" },
        convertNumberToTime(row.getValue("estimateTime"))
      );
    },
  },
  {
    accessorKey: "markAsId",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Type" }),
    cell: ({ row }) => {
      const data = status.find((i) => i.id === row.getValue("markAsId"));
      const res = data ? (data.name as any)[String(locale.value)] : "";
      return h("span", { class: "max-w-[500px] truncate font-medium" }, res);
    },
  },
  {
    accessorKey: "markTime",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Promotion time" }),
    cell: ({ row }) => {
      const time1 = (row.getValue("markTime") as any)[0];
      return h("span", { class: "max-w-[500px] truncate font-medium" }, time1);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Status" }),
    cell: ({ row }) => {
      const data = manualStatus.find((i) => i.id === row.getValue("status"));
      const res = data ? (data.name as any)[String(locale.value)] : "";

      return h("span", { class: "max-w-[500px] truncate font-medium" }, res);
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

function updatePageSize(newPs: number) {
  pageData.value.pageSize = +newPs;
}

function handleActionRow({
  action,
  row,
}: {
  action: T_ROW_FUNCTION;
  row: any;
}) {
  if (action.isShow) {
    if (action.id === "DELETE") {
    }

    if (action.id === "EDIT") {
      open.value = true;
      rowEditting.value = row;
    }
  }
}

const loadDataForPage = async (page: number) => {
  await store.getListPetCombo({
    pageIndex: page,
    pageSize: pageData.value.pageSize,
  });
};

onMounted(async () => {
  await store.getListPetCombo({
    pageIndex: pageData.value.pageIndex,
    pageSize: pageData.value.pageSize,
  });
});

watch(
  () => pageData.value.pageSize,
  async () => {
    await store.getListPetCombo({
      pageIndex: pageData.value.pageIndex,
      pageSize: pageData.value.pageSize,
    });
  }
);
</script>
