<script lang="ts" setup>

import { provide, ref, withDefaults, defineProps} from 'vue'
import Nav from './components/Nav.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import AppLogo from '@/components/common/AppLogo.vue';
import { PROVIDER_KEYS } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import {ADMIN_NAVIGATOR} from "@/lib/navigations"
interface Props {
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
  defaultLayout: () => [265, 435],
})

const isCollapsed = ref(props.defaultCollapsed)

function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false;
}

provide(PROVIDER_KEYS.IS_COLLAPSE, isCollapsed)
</script>

<template>
  <div class="hidden flex-col md:flex min-h-screen relative">
    <div class="relative h-screen">
      <TooltipProvider :delay-duration="0">
        <ResizablePanelGroup id="resize-panel-group-1" direction="horizontal" class="h-screen items-stretch"
          :collapsible="isCollapsed" :auto-save-id="'resize-panel-1'">
          <ResizablePanel id="resize-panel-1" :default-size="defaultLayout[0]" :collapsed-size="navCollapsedSize"
            collapsible :min-size="15" :max-size="20" :class="cn(isCollapsed && 'min-w-[60px] transition-all duration-300 ease-in-out')
              " @expand="onExpand" @collapse="onCollapse">
            <div :class="cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2'
            )
              ">
              <AppLogo :is-collapsed="isCollapsed" />
            </div>
            <Separator />
            <Nav :is-collapsed="isCollapsed" :links="ADMIN_NAVIGATOR" />
          </ResizablePanel>


          <ResizableHandle id="resize-handle-1" with-handle />


          <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]">
            <ScrollArea class="h-screen flex  bg-[#f5f5f5] w-full">
                <slot />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  </div>
</template>
