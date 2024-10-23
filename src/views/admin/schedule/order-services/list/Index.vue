<template>
  <div>
    <Header>
      <h1 class="font-semibold flex items-center gap-2">
        List Schedule ({{ totalRecord }})
      </h1>
    </Header>

    <ContentWrap>
      <div class="relative top-10">
        <DataTable :headerAdvanced="headerAdvanced" :data="searchOrderService" :columns="columns"
          :page-count="searchTotalPage" :page-data="pageData"
          :saveColumnVisible="{ name: 'customers', isRemeber: true }"
          :add-new-handle="{ content: null, type: 'function' }" :show-search="true" :buttonFunctions="buttonFunctions"
          @on-input="onInput" />
      </div>
    </ContentWrap>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/views/admin/components/Header.vue";
import ContentWrap from "@/views/admin/components/ContentWrap.vue";
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRaw } from "vue";
import { useOrderService } from "@/stores";
import { storeToRefs } from "pinia";
import { getTotalRecord, type QueryCondition } from "@/lib/firebaseFn";
import { COLLECTION, HEADER_ADVANCE_FUNCTION, INITIAL_PAGE_INDEX } from "@/lib/constants";
import { DataTable } from "@/components/common";
import type { ColumnDef, PaginationState } from "@tanstack/vue-table";
import DataTableColumnHeader from "@/components/common/DataTable/DataTableColumnHeader.vue";
import { h } from "vue";
import type { IHeaderAdvanced } from "@/types";
import { status } from "@/data/order-services-status.json";
import { useI18n } from "vue-i18n";

const $store = useOrderService();
const { loading, searchOrderService, searchTotalPage } = storeToRefs($store);
const totalRecord = ref(0);
const buttonFunctions = defineAsyncComponent(() => import("./components/SearchTime.vue"));

const headerAdvanced = reactive<IHeaderAdvanced[]>([
  HEADER_ADVANCE_FUNCTION.SETTING_COLUMN,
  HEADER_ADVANCE_FUNCTION.ADD_NEW,
]);

const pageData = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: 5,
});

const dataSearch = ref<QueryCondition[]>([]); 
const { locale } = useI18n();

const onInput = (vl: string | number) => {
  const sKs = [
    { fieldId: "phoneNumber", operator: "==", value: vl },
    { fieldId: "name", operator: "==", value: vl },
  ];
  dataSearch.value = sKs
};

const columns: ColumnDef<any>[] = reactive([
  {
    accessorKey: "index",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "#" }),
    cell: ({ row }) => h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("index")),
  },
  {
    accessorKey: "name",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Username" }),
    cell: ({ row }) => h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("name")),
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Phone Number" }),
    cell: ({ row }) => h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("phoneNumber")),
  },
  {
    accessorKey: "petNum",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Pet Number" }),
    cell: ({ row }) => h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("petNum")),
  },
  {
    accessorKey: "time",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Time" }),
    cell: ({ row }) => h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("time")),
  },
  {
    accessorKey: "services",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Services" }),
    cell: ({ row }) => {
      const services = (row.getValue("services") as any[])?.map((i, index) => {
        return index < row.original.services.length - 1 ? `${i?.name} + ` : i?.name;
      }).join(''); // Join services to a string
      return h("span", { class: "max-w-[500px] truncate font-medium" }, services);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Status" }),
    cell: ({ row }) => {
      const stt = (status.find((i) => i.value === row.getValue("status")) as any)?.name?.[String(locale.value)];
      return h("span", { class: "max-w-[500px] truncate font-medium" }, stt);
    },
  }
]);

onMounted(async () => {
  totalRecord.value = await getTotalRecord(COLLECTION.ORDER_SERVICES);
  await nextTick();
  await $store.searchServiceOrder({
    pageIndex: 1,
    pageSize: 25,
    dataSearch: [],
  });
});



watch(() => dataSearch.value, async () => {
  await nextTick();
  if (dataSearch.value.length > 0) {
    const raw = toRaw(dataSearch.value);

    await $store.searchServiceOrder({
      pageIndex: 1,
      pageSize: 25,
      dataSearch: raw,
    })
  }
})
</script>
