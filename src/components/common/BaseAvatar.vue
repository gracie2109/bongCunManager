<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="cursor-pointer">
      <Avatar size="xs">
        <AvatarImage
          :src="avatar"

          alt="@radix-vue"
        />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">

      <DropdownMenuLabel>{{  currentUser.email ?? ""}}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { placeholderImg } from "@/setting";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useAuthStore();
const { currentUser } = storeToRefs(store);
function handleLogout() {
  store.signoutHdl();
}

const avatar = computed(() => (currentUser.value && currentUser.value.photoURL && currentUser.value.photoURL !== null && currentUser.value.photoURL !== "")
    ? currentUser.value.photoURL : placeholderImg
)
</script>
