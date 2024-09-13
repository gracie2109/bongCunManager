<template>


    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Avatar size="xs">
                <AvatarImage :src="user.photoURL || 'https://github.com/radix-vue.png'" alt="@radix-vue" />
                <AvatarFallback>hh</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User class="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
} from '@/components/ui/dropdown-menu'
import { getLocalStorage } from '@/lib/utils';
const user = JSON.parse(getLocalStorage('auth'));

</script>