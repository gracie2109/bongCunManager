<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRoute } from "vue-router";
import clsx from "clsx";
import type { LinkProp } from "@/types";

interface NavProps {
  isCollapsed: boolean;
  links: LinkProp[];
}

const props = defineProps<NavProps>();
const route = useRoute();

</script>

<template>
  <div
    :data-collapsed="props.isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav
      class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
    >
      <template v-for="(link, index) of props.links">
        <Tooltip
          v-if="props.isCollapsed"
          :key="`1-${index}`"
          :delay-duration="0"
        >
          <TooltipTrigger as-child>
            <router-link
              :to="{ name: link.name }"
              :class="
                cn(
                  buttonVariants({ variant: link.variant, size: 'icon' }),
                  'h-9 w-9',
                  link.variant === 'default' &&
                    'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                )
              "
            >
              <Icon
                :icon="link.icon"
                class="size-4"
                :class="clsx({ 'text-primary': route.name === link.name })"
              />
              <span class="sr-only capitalize">{{ link.title }}</span>
            </router-link>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
          </TooltipContent>
        </Tooltip>

        <router-link
          :to="{ name: link.name }"
          v-else
          :key="`2-${index}`"
          :class="
            cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              link.variant === 'default' &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start'
            )
          "
        >
          <Icon
            :icon="link.icon"
            class="mr-2 size-4"
            :class="clsx({ 'text-primary': route.name === link.name })"
          />
          <span
            :class="
              clsx(
                'capitalize',
                route.name === link.name ? 'text-primary font-semibold' : ''
              )
            "
          >
            {{ link.title }}
          </span>
        </router-link>
      </template>
    </nav>
  </div>
</template>
