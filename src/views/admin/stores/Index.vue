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
  <ContentWrap> </ContentWrap>

  <AddStore @change-open="() => (open = !open)" :open="open" />
</template>

<script lang="ts" setup>
import { Header, ContentWrap } from "@/views/admin/components";
import SearchView from "@/components/common/SearchView.vue";
import SearchWrap from "../components/SearchWrap.vue";
import { ref } from "vue";

import AddStore from "./add-store/Index.vue";
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useVueTable,
} from "@tanstack/vue-table"

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  ExpandedState,
} from '@tanstack/vue-table'



import { useProductStore } from "@/stores";
import { storeToRefs } from "pinia";
import { valueUpdater } from '@/lib/utils';


const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})



const productStore = useProductStore();
const {products,loading} = storeToRefs(productStore)

const columns = ref()

const open = ref(false);
const table = useVueTable({
    get data() { return products },
    get columns() { return columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
        get expanded() { return expanded.value },
    },
})
function onReset() {
  alert("reset");
}
function clearFilter() {
  alert("clearFilter");
}
function setOpen() {
  open.value = !open.value;
}
</script>
 