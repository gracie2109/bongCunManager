<template>
  <div
    class="border border-primary h-24 rounded-md grid grid-cols-4 grid-rows-3 max-w-[300px]"
  >
    <div class="col-span-1 row-span-3 border border-r-red-500 space-y-2">
      <div class="w-full h-full space-y-3">
        <Settings class="size-5 mr-2" />
        <HeartOff
          class="size-5 mr-2"
          v-if="props.data.petIds?.includes(String($route.params.petId))"
        />
        <Heart
          class="size-5"
          v-if="!props.data.petIds?.includes(String($route.params.petId))"
        />
      </div>
    </div>
    <div class="col-span-3 row-span-2">
      <h1 class="font-bold capitalize px-2">{{ props.data.name }}</h1>
    </div>
    <div class="col-span-3 row-span-1 text-center grid">
      <div
        class="flex gap-3 items-center justify-start px-2"
        v-if="props.data.petsProfiles"
      >
        <TooltipProvider>
          <Tooltip v-for="(i, ii) in props.data.petsProfiles">
            <TooltipTrigger as-child>
              <Icon
                class="size-6 inline-block"
                :icon="i.icon"
                :key="ii"
                :class="
                  cn({
                    'hover:text-primary cursor-pointer': props.enable === i.id,
                    'text-muted-foreground': props.enable !== i.id,
                  })
                "
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ i.name }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { computed } from "vue";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { Settings, HeartOff, Heart } from "lucide-vue-next";
type TEnable = string | "all" | undefined;
const props = defineProps<{
  data: any;
  enable: TEnable;
}>();
</script>
