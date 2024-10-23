<template>
  <div class="w-[950px]">
    <OrderSeviceForm
      :form="form"
      :listCombo="listCombo"
      :list-service="petServices"
      :loading="loading"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import OrderSeviceForm from "./components/OrderSeviceForm.vue";
import { usePetCombo, usePetServices , useOrderService} from "@/stores";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { toTypedSchema } from "@vee-validate/zod";
import { orderServiceSchema } from "@/validations/order-service";
const formSchema = toTypedSchema(orderServiceSchema);


const form = useForm({
  validationSchema: formSchema,
});

const $service = usePetServices();
const $combo = usePetCombo();
const $orderService = useOrderService()
const { petServices, loading } = storeToRefs($service);
const { listCombo } = storeToRefs($combo);


onMounted(async () => {
  await $service.getListPetService({ pageIndex: 1, pageSize: 500 });
  await $combo.getListPetCombo({ pageIndex: 1, pageSize: 500 });
});


const onSubmit = form.handleSubmit(async (values) => {
      await $orderService.createServiceOrder(values);
      form.resetForm();
      form.handleReset()
});
</script>
 