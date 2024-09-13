<template>
  <section class="mx-auto grid gap-6">
    {{ formSchema }}
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">
        {{ $t("pageMeta.login") }}
      </h1>
      <p class="text-balance text-muted-foreground">
        {{ $t("pageFields.authen.prefLogin") }}
      </p>
    </div>
    <div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            name="email"
            @update:model-value="(vl) => onChangeData('email', vl)"
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            name="password"
            @update:model-value="(vl) => onChangeData('password', vl)"
          />
        </div>
        <Button type="submit" class="w-full" @click="handleSubmit()">
          {{ $t("pageMeta.login") }}
        </Button>
        <Button variant="outline" class="w-full"> Login with Google </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        {{ $t("pageFields.authen.dontHaveAccount") }}
        <router-link :to="$router.resolve({ name: 'register' })" class="underline">
          {{ $t("pageMeta.register") }}
        </router-link>
      </div>
    </div>
  </section>
  <div v-if="loading">
    <LoadingIndicator />
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";
const authStore = useAuthStore();
const router = useRouter();
type IForm = {
  email: string;
  password: string;
};

const { loading, currentUser } = storeToRefs(authStore);

function onChangeData(key: keyof IForm, value: any) {
  const update = { [key]: typeof value === "string" ? value.trim() : value };
  const dataVl = { ...formSchema.value, ...update };
  formSchema.value = dataVl;
}

const formSchema = ref({
  email: "",
  password: "",
});

async function handleSubmit() {
  await authStore.login(formSchema.value);

  if (currentUser) {
    console.log("login success", currentUser);
    router.push({ name: "home" });
  }
}
</script>
