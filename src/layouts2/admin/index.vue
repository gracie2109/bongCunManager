<script lang="ts" setup>

import { provide, ref } from 'vue'
import Nav, { type LinkProp } from './components/Nav.vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import AppLogo from '@/components/common/AppLogo.vue';
import { PROVIDER_KEYS } from '@/lib/constants';
import { ScrollArea } from '@/components/ui/scroll-area';

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

const links: LinkProp[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: 'lucide:inbox',
    variant: 'default',
  },
  {
    title: 'Drafts',
    label: '9',
    icon: 'lucide:file',
    variant: 'ghost',
  },
  {
    title: 'Sent',
    label: '',
    icon: 'lucide:send',
    variant: 'ghost',
  },
  {
    title: 'Junk',
    label: '23',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
  {
    title: 'Trash',
    label: '',
    icon: 'lucide:trash',
    variant: 'ghost',
  },
  {
    title: 'Archive',
    label: '',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

const links2: LinkProp[] = [
  {
    title: 'Social',
    label: '972',
    icon: 'lucide:user-2',
    variant: 'ghost',
  },
  {
    title: 'Updates',
    label: '342',
    icon: 'lucide:alert-circle',
    variant: 'ghost',
  },
  {
    title: 'Forums',
    label: '128',
    icon: 'lucide:message-square',
    variant: 'ghost',
  },
  {
    title: 'Shopping',
    label: '8',
    icon: 'lucide:shopping-cart',
    variant: 'ghost',
  },
  {
    title: 'Promotions',
    label: '21',
    icon: 'lucide:archive',
    variant: 'ghost',
  },
]

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
            <Nav :is-collapsed="isCollapsed" :links="links" />
            <Separator />
            <Nav :is-collapsed="isCollapsed" :links="links2" />
          </ResizablePanel>


          <ResizableHandle id="resize-handle-1" with-handle />


          <ResizablePanel id="resize-panel-2" :default-size="defaultLayout[1]" :min-size="30">
            <ScrollArea class="h-screen flex">
              <slot />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  </div>
</template>
