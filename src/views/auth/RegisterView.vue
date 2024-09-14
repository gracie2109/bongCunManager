<template>
  <section class="mx-auto w-[350px]">
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
          <div class="grid grid-cols-2 gap-3">
            <div class="grid gap-2">
              <Label for="password">First name</Label>

              <Input id="password" type="text" required placeholder="Max" name="firstName"
                @update:model-value="(vl) => onChangeData('firstName', vl)" />
            </div>
            <div class="grid gap-2">
              <Label for="password">Last name</Label>

              <Input id="password" type="text" required placeholder="Robinson" :disabled="isCheckStt" name="lastName"
                @update:model-value="(vl) => onChangeData('lastName', vl)" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="m@example.com" required
              @update:model-value="(vl) => onChangeData('email', vl)" :disabled="isCheckStt" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <InputPassword id="password" name="password" @update-value="(vl:string) => onChangeData('password', vl)"
              placeholder="********" />
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
import type { IRegisterPayload } from "@/types/user.type"
import { InputPassword } from "@/components/common";

const isCheckStt = ref(false);
const authStore = useAuthStore();
const { loading, isSuccess } = storeToRefs(authStore);

const formSchema = ref<IRegisterPayload>({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
});

function onChangeData(key: keyof IRegisterPayload, value: any) {
  const update = { [key]: typeof value === "string" ? value.trim() : value };
  const dataVl = { ...formSchema.value, ...update };
  formSchema.value = dataVl;
}
const emits = defineEmits(['directPath'])

function redirectPath() {
  emits('directPath', 'login')
}

async function handleSubmit() {
  await authStore.signUp(formSchema.value);
  if(isSuccess.value){
    redirectPath()
  }
}

onMounted(async () => {
  await authStore.getListUsers();
});
</script>
