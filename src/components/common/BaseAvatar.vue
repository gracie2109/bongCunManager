<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child class="cursor-pointer">
            <Avatar size="xs">
                <AvatarImage :src="currentUser.photoURL || 'https://github.com/radix-vue.png'" alt="@radix-vue" />
                <AvatarFallback>
                    <span class="capitalize">{{ fallName }}</span>

                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>{{ currentUser.email }}</DropdownMenuLabel>
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { computed } from 'vue';
import { useAuthStore } from "@/stores";
import { storeToRefs } from 'pinia';
import { removeStorage } from '@/lib/utils';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter()
const { currentUser } = storeToRefs(store)
const fallName = computed(() => currentUser ? `${currentUser.value.firstName?.split('')[0]}${currentUser.value.lastName?.split('')[0]}` : "YN");
function handleLogout() {
    removeStorage([]);
    router.go(0)
}

</script>