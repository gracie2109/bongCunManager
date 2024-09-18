<template>
  <Header> list store header </Header>

  <SearchWrap>
    <SearchView placeholder="Search by store" @reset="onReset" @clear-filter="clearFilter" @setOpen="setOpen" :addNew="{
      type: 'function',
      content: null,
    }" />
  </SearchWrap>
  <ContentWrap> </ContentWrap>

    <AddStore @change-open="() => open = !open" :open="open" />


</template>

<script lang="ts" setup>
import { Header, ContentWrap } from "@/views/admin/components";
import SearchView from "@/components/common/SearchView.vue";
import SearchWrap from "../components/SearchWrap.vue";
import { ref } from "vue";

import AddStore from "./add-store/Index.vue"
const open = ref(false);

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
