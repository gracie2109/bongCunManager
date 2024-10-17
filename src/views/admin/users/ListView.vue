<template>
    <Header>
        <h1
        class="font-semibold flex items-center gap-2"
      >
        <User2 class="size-4 text-primary" />
        {{ $t("pageMeta.customers") }}
      </h1>
    </Header>

    <ContentWrap>
        <div>
        da
        
        
        
        </div>
    </ContentWrap>
</template>


<script lang="ts" setup>
import { Header, ContentWrap } from "@/views/admin/components";
import { User2 } from "lucide-vue-next";


</script>


<style>
.admin_content {
    position: relative;
    top: 2.5rem;
    padding: 1.25rem
}
</style>