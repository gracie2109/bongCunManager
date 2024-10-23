<template>
    <div>
        <RangeDateShadcn :defaultValue="defaultValue" :value="value" @update="handleDate" />
    </div>
</template>

<script lang="ts" setup>
import RangeDateShadcn from "@/components/common/RangeDateShadcn/Index.vue";
import { ref } from "vue";
const defaultValue = ref();
const value = ref();

const handleDate = (date: any) => { };
</script>
