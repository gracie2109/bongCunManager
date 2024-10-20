<template>
  <div class="space-y-6">
    <div>
      <table id="service_apply_for_all" class="w-[550px]">
        <thead>
          <tr>
            <th>Service</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, ii) in serviceTypeAll"
            :key="ii"
            :class="{
              'bg-[#dcdcdc]': props.isMouseId === i.id,
            }"
          >
            <td
              @mouseenter="() => onMouseOver(String(i.id))"
              @mouseleave="() => onMouseLeave()"
            >
              {{ i.name }}
            </td>
            <td>{{ formatPrice(i.generalPrice || "") }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-container">
      <table id="table_full" class="w-full">
        <thead>
          <tr>
            <th class="fixed-column">Weight</th>
            <th
              v-for="(i, ii) in serviceTypeWeight"
              :key="ii"
              @mouseenter="() => onMouseOver(String(i.id))"
              @mouseleave="() => onMouseLeave()"
              :class="{
                'bg-[#dcdcdc]': props.isMouseId === i.id,
              }"
            >
              {{ i.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, ii) in contents" :key="ii">
            <td class="fixed-column">
              {{ (contents[ii].lang as any)[String(locale)] }}
            </td>
            <template v-for="(k, kk) in serviceTypeWeight" :key="kk">
              <td
                v-if="
                data &&
                data[k.id] &&
                data[k.id].some((m: any) => m.weightId === i.id)
              "
                class="font-semibold text-left pl-3"
                :class="{
                  'bg-[#dcdcdc]': props.isMouseId === k.id,
                }"
              >
                {{
                  formatPrice(
                    data[k.id].find((m: any) => m.weightId === i.id)?.price
                  )
                }}
              </td>
              <td
                v-else
                :class="{
                  'bg-[#dcdcdc]': props.isMouseId === k.id,
                }"
              ></td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { usePetServices } from "@/stores";
import { useRoute } from "vue-router";
import { contents } from "@/data/pet-weights.json";
import { useI18n } from "vue-i18n";
import { formatPrice } from "@/lib/utils";

const store = usePetServices();
const route = useRoute();
const props = defineProps<{
  services: any[];
  isMouseId: string;
}>();
const emits = defineEmits(["setMouseEl"]);

const { locale } = useI18n();
const data = ref();
const serviceTypeWeight = computed(() =>
  props.services.filter((i) => i.type !== "all")
);
const serviceTypeAll = computed(() =>
  props.services.filter((i) => i.type === "all")
);

onMounted(async () => {
  const result = await store.getAllServicePriceByPetId({
    petId: String(route.params.petId),
  });
  data.value = result;
});

function onMouseOver(id: string) {
  emits("setMouseEl", id);
}

function onMouseLeave() {
  emits("setMouseEl", "");
}
</script>

<style scoped>
th,
td,
tr {
  border: 1px solid hsl(var(--primary));
}

.table-container {
  overflow-y: auto;
  /* Cho phép cuộn ngang */
  width: 100%;
  height: 100%;
  /* Đảm bảo container chiếm toàn bộ chiều rộng */
}

#table_full {
  width: 100%;
  border-collapse: collapse;
  /* Xóa khoảng cách giữa các ô */
}

th,
td {
  padding: 8px;
  /* Tùy chọn: thêm khoảng đệm cho ô */
  text-align: left;
  /* Căn trái cho văn bản */
}

.fixed-column {
  position: sticky;
  /* Giữ cột cố định */
  left: 0;
  /* Cố định ở bên trái */
  background: white;
  /* Để đảm bảo màu nền khi cuộn */
  z-index: 1;
  /* Đảm bảo cột nằm trên các cột khác */
}
</style>
