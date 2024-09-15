<template>
  <section class="mx-auto min-w-[350px] w-96">
    <div class="grid gap-2 text-center">
      <h1 class="text-3xl font-bold">
        {{ $t("pageMeta.register") }}
      </h1>
      <p class="text-balance text-muted-foreground">
        {{ $t("pageFields.authen.prefSignup") }}
      </p>
    </div>
    <div class="h-full">
      <div class="mt-5">
        <div class="grid gap-4">
     
<div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" required
              v-model:model-value="formSchema.email" :disabled="isCheckStt" />
          </div>
            <div class="grid gap-2">
              <Label for="password">displayName</Label>
              <Input id="password" type="text" required placeholder="Robinson" :disabled="isCheckStt" name="displayName"
                v-model:model-value="formSchema.displayName" />
            </div>
          
     <div class="grid grid-cols-2 gap-3">
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <InputPassword id="password" name="password" v-model:model-value="formSchema.password"
              placeholder="********" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Reset Password</Label>
            <InputPassword id="password" name="password" v-model:model-value="resetPass" placeholder="********" />
          </div>
</div>

          

          <Button class="w-full" @click="handleSubmit()" :disabled="loading">
            {{ $t("pageFields.authen.createAcc") }}
          </Button>
          <Button variant="outline" class="w-full" :disabled="loading">
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ $t("pageFields.authen.alreadyHasAccount") }}
          <p @click="redirectPath" class="underline cursor-pointer">
            {{ $t("pageMeta.login") }}
          </p>
        </div>
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
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import LoadingIndicator from "@/components/common/LoadingIndicator.vue";
import type { IRegisterPayload } from "@/types/user.type";
import { InputPassword } from "@/components/common";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const emits = defineEmits(["directPath"]);

const isCheckStt = ref(false);
const authStore = useAuthStore();
const { loading, isSuccess } = storeToRefs(authStore);
const resetPass = ref('')
const formSchema = ref<IRegisterPayload>({
  email: "",
  displayName: '',
  password: "",
});


function redirectPath() {
  if (route.fullPath?.includes("register")) {
    router.push({ name: "login" });
  } else {
    emits("directPath", "login");
  }
}

async function handleSubmit() {
  await authStore.signUp(formSchema.value);
  if (isSuccess.value) {
    redirectPath();
    if (route.fullPath?.includes("login")) {
      router.resolve({ name: "login" });
    } else {
      redirectPath();
    }
  }
}

onMounted(async () => {
  await authStore.getListUsers();
});
</script>
