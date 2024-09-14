<template>
  <section class="mx-auto grid gap-6">
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
          <Input id="email" type="email" placeholder="m@example.com" required name="email"
            @update:model-value="(vl) => onChangeData('email', vl)" />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>

          <InputPassword id="password" name="password" @update-value="(vl) => onChangeData('password', vl)"
            placeholder="********" />
        </div>
        <Button type="submit" class="w-full" @click="handleSubmit()">
          {{ $t("pageMeta.login") }}
        </Button>
        <Button variant="outline" class="w-full"> Login with Google </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        {{ $t("pageFields.authen.dontHaveAccount") }}
        <p @click="redirectPath()" class="underline cursor-pointer">
          {{ $t("pageMeta.register") }}
        </p>
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";
const authStore = useAuthStore();
const router = useRouter();
import type { ILoginPayload } from "@/types/user.type"
import InputPassword from "@/components/common/InputPassword.vue";

const emits = defineEmits(['directPath', 'closeDialog'])
const { loading, isSuccess } = storeToRefs(authStore);

function onChangeData(key: keyof ILoginPayload, value: any) {
  const update = { [key]: typeof value === "string" ? value.trim() : value };
  const dataVl = { ...formSchema.value, ...update };
  formSchema.value = dataVl;
}

function redirectPath() {
  emits('directPath', 'register')
}
const formSchema = ref({
  email: "",
  password: "",
});

async function handleSubmit() {
  await authStore.login(formSchema.value);
  if (isSuccess.value) {
    router.go(0);
    emits('closeDialog')
  }
}
</script>
