<template>
  <AddressForm :form="formModel" />
</template>
<script lang="ts" setup>
import AddressForm from "@/components/AddressForm/Index.vue";
import { initAddress } from "@/types/location.type";
import { ref } from "vue";

const formModel = ref({
  ...initAddress,
  name: "",
});
</script>
