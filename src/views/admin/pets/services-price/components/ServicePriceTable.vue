<template>
  <div class="space-y-3 w-full h-full">
    <div class="flex flex-end justify-end gap-x-3">
      <Button
        variant="outline"
        @click="clearData"
        :disabled="!props.isHandleForm || loading"
      >
        <RotateCcw class="size-4 mr-2" :class="{'animate-spin': loading}"/>
        Clear
      </Button>
      <Button @click="handleSubmit" :disabled="!props.isHandleForm || loading" >
        <Save class="size-4 mr-2"  />
        Save
      </Button>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th>Weights</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data2" :key="item.weightId" class="p-3">
          <td>{{ (contents[index].lang as any)[String(locale)] }}</td>
          <td class="p-1">
            <Input
              :readonly="loading"
              type="number"
              :placeholder="`Enter price of ${(contents[index].lang as any)[String(locale)]}`"
              v-model:model-value="item.price"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { contents } from "@/data/pet-weights.json";
import Input from "@/components/ui/input/Input.vue";
import { useRoute } from "vue-router";
import Button from "@/components/ui/button/Button.vue";
import { Save, RotateCcw } from "lucide-vue-next";
import { usePetServices } from "@/stores";
import { storeToRefs } from "pinia";

type IPrice = {
  [key: string]: string | number;
};

const props = defineProps<{
  isHandleForm: boolean;
}>();

const { locale } = useI18n();
const store = usePetServices();
const {loading} = storeToRefs(store)
const route = useRoute();
const isAdd = ref(true);

const data2 = ref<IPrice[]>(
  contents.map((i) => {
    return {
      id: "",
      petId: String(route.params.petId),
      serviceId: String(route.params.serviceId),
      weightId: String(i.id),
      price: "",
    };
  })
);

async function clearData() {
  await getServicePrice();
}

async function handleSubmit() {
  if (data2.value) {
    await store.createPetServicePrice({
      data: data2.value,
      isAdd: isAdd.value,
    });
    await getServicePrice();
  }
}

async function getServicePrice() {
  const result = await store.getServicePriceByPetId({
    petId: String(route.params.petId),
    serviceId: String(route.params.serviceId),
  });
  console.log("result", result)
  if (result && Array.isArray(result) && result.length > 0) {
    isAdd.value = false;

    result.forEach((item: any) => {
      const matched = data2.value.find(
        (dataItem) =>
          dataItem.petId === item.petId &&
          dataItem.serviceId === item.serviceId &&
          dataItem.weightId === item.weightId
      );
      if (matched) {
        matched.price = item.price;
        matched.id = item.id;
      }
    });
  }
  else isAdd.value = true;
}

onMounted(async () => {
  await getServicePrice();
});
</script>

<style scoped>
th,
td,
tr {
  border: 1px solid hsl(var(--primary));
}
</style>
