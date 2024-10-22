<template>
  <div class="w-[950px]">
    <OrderSeviceForm
      :form="form"
      :listCombo="listCombo"
      :list-service="petServices"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import OrderSeviceForm from "./components/OrderSeviceForm.vue";
const form = useForm();
import { usePetCombo, usePetServices } from "@/stores";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const Sservice = usePetServices();
const Scombo = usePetCombo();

const { petServices, loading } = storeToRefs(Sservice);
const { listCombo } = storeToRefs(Scombo);


onMounted(async () => {
  await Sservice.getListPetService({ pageIndex: 1, pageSize: 500 });
  await Scombo.getListPetCombo({ pageIndex: 1, pageSize: 500 });
});
</script>
