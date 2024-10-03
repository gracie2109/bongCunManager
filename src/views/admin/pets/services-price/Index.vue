<template>
  <PageTitle />

  <ContentWrap>
    
  </ContentWrap>
</template>

<script setup lang="ts">
import { usePets } from "@/stores";
import { ContentWrap } from "@/views/admin/components";
import { storeToRefs } from "pinia";
import PageTitle from "../PageTitle.vue";
const store = usePets();

</script>