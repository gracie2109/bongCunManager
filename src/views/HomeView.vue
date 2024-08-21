<script lang="ts" setup>
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import {useProductStore} from "@/stores/products"
import {type InferProductFormInfo, productFormSchema} from "@/validations/products";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import {CustomCombobox, CustomButton} from "@/components/common";
import {Trash} from "lucide-vue-next"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import CustomInputField from "@/components/common/CustomInputField.vue";

const formSchema = toTypedSchema(productFormSchema)
const store = useProductStore();
const {products, loading} = storeToRefs(store)

const {handleSubmit, resetForm} = useForm({
  validationSchema: formSchema,
})

onMounted(async () => {
  await store.getListProducts()
});

const onSubmit = handleSubmit(async (values: InferProductFormInfo) => {
  await store.createProduct(values);
  resetForm()
});

const handleClick = async (i: any) => {
  await store.deleteProduct(i.id)
}

const frameworks = [
  {value: 'next.js', label: 'Next.js nef ', key: '1'},
  {value: 'sveltekit', label: 'SvelteKit sda', key: '2'},
  {value: 'nuxt', label: 'Nuxt', key: '3'},
  {value: 'remix', label: 'Remix', key: '4'},
  {value: 'astro', label: 'Astro', key: '5'},
]

const optionValue = ref()
function selectOption (value:any) {
  optionValue.value = value
}

const testUpdate = reactive(['next.js','sveltekit','nuxt'])
</script>

<template>
    <div id="showTable">
        <div v-if=" !products">
          Loading
        </div>
        <div v-else>
          <table class="table-auto mt-20">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Desc</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="(i, j)  in products" :key="i.id">
                <td>{{ j + 1 }}</td>
                <td>{{i['name']}}</td>
                <td>{{ i['desc'] || i['description'] }}</td>
                <td>
                  <CustomButton variant="destructive" :disabled="loading"  :size="'icon'"  button-text="" type="button" @click="handleClick(i)">
                      <template #icon>
                       <Trash  class="w-4 h-4"/>
                      </template>
                    </CustomButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    <div>
  <form class="w-1/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>{{ $t('pageFields.products.name') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shading" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>{{ $t('pageFields.products.description') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="desc" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <CustomCombobox
              :options="frameworks"
              placeholder="Choose"
              @select-option="selectOption"
              :value="testUpdate"
          />


          <CustomInputField label="name" />
          <CustomButton :button-text="$t('common.submit')" :loading="loading" type="submit" />
  </form>

    </div>
</template>
