<script lang="ts" setup>
import {onMounted, type Ref, ref, watch, watchEffect} from 'vue'
import {Button} from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover'
import {Badge} from '@/components/ui/badge'
import type {SelectOptionValue} from "@/types";
import {ChevronDown, ChevronsUpDown} from "lucide-vue-next";
const dataValue = ref<string[]>([]);
const dataValueWithLabel = ref(new Map())

const open = ref(false);

const props = defineProps<{
  placeholder: string,
  options: SelectOptionValue[],
  isMulti?: boolean,
  value:any
}>();

const emit = defineEmits(['selectOption'])

function handleSelect(data: any) {
  if (typeof data === 'string') {
    if (props.isMulti) {
      const findItem = dataValue.value.find((i) => i === data);
      if (!findItem) dataValue.value = dataValue.value ? [...dataValue.value, data] : [data];
      else dataValue.value = dataValue.value.filter((i) => i !== data);
    } else {
      dataValue.value = [data];
    }
  }
  emit('selectOption', dataValue.value)
}

onMounted(() => {
  if(props.options) {
    props.options.map((i) => {
      dataValueWithLabel.value = dataValueWithLabel.value.set(i.value, i.label)
    })
  }


  if(props.value){
    dataValue.value = props.value
  }
});




</script>

<template>
  <div class="mt-12">
    <Popover v-model:open="open" class="mt-24">
      <PopoverTrigger as-child>
        <Button
            :aria-expanded="open"
            class="h-auto w-full flex justify-between"
            role="combobox"
            variant="outline"
        >
          <div v-if="dataValue.length > 0"
               class="w-full  gap-y-1 flex flex-wrap h-auto"
          >
              <Badge v-if="props.isMulti" v-for="i of dataValue" class="mr-0.5 flex justify-between gap-2"  variant="secondary">
                    {{ dataValueWithLabel.get(i) }}
              </Badge>
            <div v-else>{{ dataValue[0] }}</div>
          </div>
          <span v-else>Select framework...</span>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent  class=" p-0 w-[full]">
        <Command>
          <CommandInput :placeholder="props.placeholder" class="h-9"/>
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                  v-for="framework in props.options"
                  :key="framework.value"
                  :value="framework.value"
                  class="w-full"
                  @select="(ev) => {
                    handleSelect(ev.detail.value)
              }"
              >

                <div class="flex justify-between w-full">
                  <p :class="{'font-semibold': dataValue.includes(framework.value)}"> {{ framework.label }}</p>
                  <ChevronDown :class="{'hidden':  !dataValue.includes(framework.value)}" class="w-4 h-4"/>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>