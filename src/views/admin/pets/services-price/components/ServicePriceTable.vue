<template>
  <div class="space-y-3 w-full h-full">
    <div class="flex flex-end justify-end gap-x-3">
      <Button
        variant="outline"
        @click="clearData"
        :disabled="!props.isHandleForm"
      >
        <RotateCcw
          class="size-4 mr-2"
          :class="{
            'animate-spin': isClear,
          }"
        />
        Clear
      </Button>
      <Button @click="handleSubmit" :disabled="!props.isHandleForm">
        <Save class="size-4 mr-2" />
        Save
      </Button>
    </div>
    {{data}}
    <table class="w-full">
      <thead>
        <tr>
          <th>Weights</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in contents" :key="i.id" class="p-3">
          <td>{{ (i.lang as any)[String(locale)] }}</td>
          <td class="p-1">
            <Input
              type="number"
              :placeholder="`Enter price of ${(i.lang as any)[String(locale)]}`"
              v-model:model-value="data[i.id]"
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
import { toast } from "vue-sonner";
import { usePetServices } from "@/stores";

type IPrice = {
  [key: string]: string | number;
};

const props = defineProps<{
  isHandleForm: boolean;
}>();

const { locale } = useI18n();
const store = usePetServices();
const data = ref<IPrice>({});
const route = useRoute();
const isClear = ref(false);

function clearData() {
  isClear.value = true;
  setTimeout(() => {
    data.value = {};
    isClear.value = false;
    toast.success("Reset success");
  }, 500);
}


async function handleSubmit() {
  if (data.value) {
    await store.createPetServicePrice({
      data: data.value,
      isAdd: true,
      petId: String(route.params.petId),
      serviceId: String(route.params.serviceId),
    });
    await getServicePrice();
  }
}

async function getServicePrice() {
  const result = await store.getServicePriceByPetId({
    petId: String(route.params.petId),
    serviceId: String(route.params.serviceId),
  });
  if (result) {
    data.value = result.reduce((acc, item) => {
      const key = item.weightId;
      const value = item[key];

      if (key && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
}

onMounted(async () => {
  getServicePrice();
});
</script>

<style scoped>
th,
td,
tr {
  border: 1px solid hsl(var(--primary));
}
</style>
