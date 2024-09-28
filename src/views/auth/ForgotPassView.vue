<template>
  <section class="mx-auto grid gap-6">
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">
        {{ $t("pageMeta.forgotPw") }}
      </h1>
      <p class="text-balance text-muted-foreground">
        {{ $t("pageFields.authen.prefForgotPw") }}
      </p>
    </div>
    <div>
      <div class="grid gap-4">
        <form @submit.prevent="submitHdl">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              name="email"
              v-model:model-value="formVl.email"
              :class="{ 'p-invalid': !!getError('email') }"
            />
            <div class="error">{{ getError("email") }}</div>
          </div>
          <Button type="submit" class="w-full" @click="submitHdl()">
            {{ $t("common.submit") }}
          </Button>
          <Button variant="outline" class="w-full" @click="redirectPath()"> Back </Button>
        </form>
      </div>
    </div>
  </section>
  <div v-if="loading">
    <LoadingIndicator />
  </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ref } from "vue";
import { useAuthStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { LoadingIndicator } from "@/components/common";
import useValidation from "@/composables/useValidation";
import { EmailSChema } from "@/validations";

const formVl = ref({
  email: "",
});
const store = useAuthStore();
const { isSuccess, loading } = storeToRefs(store);
const emit = defineEmits(["directPath", "closeDialog"]);
const route = useRoute();
const router = useRouter();

function redirectPath() {
  if (route.fullPath?.includes("forgot-password")) {
    router.push({ name: "login" });
  } else {
    emit("directPath", "login");
  }
}

const { validate, isValid, getError, scrolltoError, errors } = useValidation(
  EmailSChema,
  formVl,
  {
    mode: "lazy",
  }
);

async function submitHdl() {
  await validate();
  if (isValid.value) {
    const mail = formVl.value.email;
    await store.sendResetPassMail(mail.trim());

    if (isSuccess) {
      emit("closeDialog");
      if (route.fullPath?.includes("forgot-password")) {
        router.push({ name: "home" });
      } else {
        redirectPath();
      }
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