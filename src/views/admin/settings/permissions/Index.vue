<template>
  <PermissionForm :loading="loading" :form="form" />
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import PermissionForm from "./PermissionForm.vue";
import { ref } from "vue";
const form = useForm();
const loading = ref(false);
</script>
