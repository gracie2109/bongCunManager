<template>

    <section class="mx-auto grid gap-6">

        <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">
                {{ $t('pageMeta.login') }}
            </h1>
            <p class="text-balance text-muted-foreground">
                {{ $t('pageFields.authen.prefLogin') }}
            </p>
        </div>
        <div>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                        <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit" class="w-full">
                    {{ $t('pageMeta.login') }}
                </Button>
                <Button variant="outline" class="w-full">
                    Login with Google
                </Button>
            </div>
            <div class="mt-4 text-center text-sm">
                {{ $t('pageFields.authen.dontHaveAccount') }}
                <router-link  :to="$router.resolve({ name: 'register' })"
                     class="underline">
                     {{ $t('pageMeta.register') }}
                </router-link>
            </div>
        </div>


    </section>



</template>


<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import {RouterLink} from "vue-router";

</script>