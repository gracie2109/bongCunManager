<script setup lang="ts">
import AppLogo from "@/components/common/AppLogo.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup, 
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import Nav from "./components/Nav.vue";
import { ADMIN_NAVIGATOR, ADMIN_NAVIGATOR2 } from "@/lib/navigations";
import { provideSidebarContext } from "@/components/ui/sidebar/utils";


const {  open } = useSidebar()



</script>

<template>
  
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppLogo :is-collapsed="open" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu class="mt-5">
            <Nav :items="ADMIN_NAVIGATOR2"/>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <div class="relative">
        <div class="relative -left-3 top-[25rem]">
          <SidebarTrigger class="-ml-1" />
        </div>
        <div class="relative top-[-2rem]">
          <slot />
        </div>
      </div>
    </SidebarInset>
</template>
