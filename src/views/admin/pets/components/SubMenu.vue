<template>
  <div>
    <div
      class="w-[250px] shadow-lg border-b-primary bg-white fixed top-12 h-12 z-40"
      id="sub_navigation"
    >
      <div
        class="h-full w-full flex items-center justify-center gap-3 cursor-pointer"
      >
        <TooltipProvider>
          <Tooltip v-if="$route.name !== 'pets'">
            <TooltipTrigger @click="$router.push({ name: 'pets' })">
              <PawPrint />
            </TooltipTrigger>
            <TooltipContent>Pets</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger @click="$router.push({ name: 'petService' })">
              <Icon icon="carbon:settings-services" class="size-6" />
            </TooltipTrigger>
            <TooltipContent>Services</TooltipContent>
          </Tooltip>

          <Tooltip v-if="$route.name !== 'petServiceCombo'">
            <TooltipTrigger @click="$router.push({ name: 'petServiceCombo' })">
              <Layers2 class="size-6" />
            </TooltipTrigger>
            <TooltipContent>Services Combo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Icon icon="iconoir:weight" class="size-6 fill-none" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel class="font-bold">
                    {{ $t("common.settingView") }}</DropdownMenuLabel
                  >
                  <DropdownMenuSeparator />
                  <DropdownMenuItem v-for="tag in contents" :key="tag.id">
                    <!-- @ts-ignore -->
                    {{ (tag.lang as any)[String(locale)] }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu></TooltipTrigger
            >
            <TooltipContent>Pet weight</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { contents } from "@/data/pet-weights.json";
import { Layers2, PawPrint } from "lucide-vue-next";
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
