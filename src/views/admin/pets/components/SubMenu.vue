<template>
  <div>
    <div
      class="w-[250px] shadow-lg border-b-primary bg-white fixed top-12 h-12 z-40"
      id="sub_navigation"
    >
      <div class="h-full w-full flex items-center justify-center gap-3 cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              @click="$router.push({ name: 'petOverview' })"
              class="tooltip_card"
            >
              <Image
                class="size-6"
                :class="{ 'text-primary': $route.name === 'petOverview' }"
              />
              <span class="tooltip_span">Overview</span>
            </TooltipTrigger>
            <TooltipContent>Overview</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger @click="$router.push({ name: 'pets' })" class="tooltip_card">
              <PawPrint
                class="size-6"
                :class="{ 'text-primary': $route.name === 'pets' }"
              />
              <span class="tooltip_span">Pets</span>
            </TooltipTrigger>
            <TooltipContent>Pets</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              @click="$router.push({ name: 'petService' })"
              class="tooltip_card"
            >
              <Icon
                icon="carbon:settings-services"
                class="size-6"
                :class="{ 'text-primary': $route.name === 'petService' }"
              />
              <span class="tooltip_span">Services</span>
            </TooltipTrigger>
            <TooltipContent>Services</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              @click="$router.push({ name: 'petServiceCombo' })"
              class="tooltip_card"
            >
              <Layers2
                class="size-6"
                :class="{ 'text-primary': $route.name === 'petServiceCombo' }"
              />
              <span class="tooltip_span">Combo</span>
            </TooltipTrigger>
            <TooltipContent>Services Combo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger class="tooltip_card">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Icon icon="iconoir:weight" class="size-6 fill-none" />
                  <span class="tooltip_span">Weights</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel class="font-bold"> Weights </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem v-for="tag in contents" :key="tag.id">
                    <!-- @ts-ignore -->
                    {{ (tag.lang as any)[String(locale)] }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>Pet weight</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { contents } from "@/data/pet-weights.json";
import { Layers2, PawPrint, Image } from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>
<style scoped>
.tooltip_card {
  text-align: center;
  width: 3rem;
  display: grid;
  place-items: center;
  padding-top: 0.25rem;
}

.tooltip_span {
  font-size: 10px;
  font-weight: 700;
}
</style>
