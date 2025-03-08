<template>
  <section class="mx-auto grid gap-6 w-full"
  
    :class="{
      'mt-5 p-5': !isExactPath
    }"
  
  >
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">
        {{ $t("pageMeta.login") }}
      </h1>
      <p class="text-balance text-muted-foreground">
        {{ $t("pageFields.authen.prefLogin") }}
      </p>
    </div>
    <div>
      <form action="" @submit.prevent="handleSubmit">
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              v-model:model-value="formSchema.email"
              :class="{ 'p-invalid': !!getError('email') }"
            />
            <div class="error">{{ getError("email") }}</div>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <span
                @click="redirectPath('forgotPw')"
                class="ml-auto inline-block text-sm underline cursor-pointer"
              >
                Forgot your password?
              </span>
            </div>

            <InputPassword
              id="password"
              name="password"
              @update-value="(vl) => (formSchema.password = vl)"
              placeholder="********"
              :class="{ 'p-invalid': !!getError('password') }"
              class="w-full"
            />
            <div class="error">{{ getError("password") }}</div>
          </div>
          <Button type="submit" class="w-full h-[50px]" @click="handleSubmit()">
            {{ $t("pageMeta.login") }}
          </Button>
          <Button variant="outline" class="w-full h-[50px]">
            Login with Google
          </Button>
        </div>
      </form>
      <div class="mt-4 text-center text-sm">
        {{ $t("pageFields.authen.dontHaveAccount") }}

        <p @click="redirectPath('register')" class="underline cursor-pointer">
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
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";
import InputPassword from "@/components/common/InputPassword.vue";
import { loginSchema } from "@/validations/auth";
import useValidation from "@/composables/useValidation";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const isExactPath = route.fullPath?.toString()?.split('/')[1] === ""

const formSchema = ref({
  email: "",
  password: "",
});

const { validate, isValid, getError, scrolltoError } = useValidation(
  loginSchema,
  formSchema,
  {
    mode: "lazy",
  }
);

const emits = defineEmits(["directPath", "closeDialog"]);
const { loading, isSuccess } = storeToRefs(authStore);

function redirectPath(name: "register" | "forgotPw") {
  if (route.fullPath?.includes("login")) {
    router.push({ name });
  } else {
    emits("directPath", name);
  }
}

async function handleSubmit() {
  await validate();
  if (isValid.value) {
    await authStore.login(formSchema.value);
    if (isSuccess.value) {
      if (route.fullPath?.includes("login")) {
        router.push({ name: "home" });
        setTimeout(() => {
          router.go(0);
        }, 500);
      } else {
        router.go(0);
      }

      emits("closeDialog");
    }
  } else {
    scrolltoError(".p-invalid", { offset: 24 });
  }
}
</script>

<style scoped>
.error {
  font-size: 14px;
  color: red;
  margin-top: 4px;
}
</style>
