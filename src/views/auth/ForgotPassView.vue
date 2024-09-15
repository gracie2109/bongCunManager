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
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required name="email"
            v-model:model-value="formVl" />
        </div>

        <Button type="submit" class="w-full" @click="submitHdl()">
          {{ $t("common.submit") }}
        </Button>
        <Button variant="outline" class="w-full" @click="redirectPath()"> Back </Button>
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
const formVl = ref("");
const store = useAuthStore();
const { isSuccess, loading } = storeToRefs(store)
const emit = defineEmits(['directPath', 'closeDialog']);
const route = useRoute();
const router = useRouter();


function redirectPath() {
  if (route.fullPath?.includes('forgot-password')) {
    router.push({ name: 'login' })
  }
  else {
    emit('directPath', 'login')
  }
}

async function submitHdl() {
  await store.sendResetPassMail(formVl.value.trim());

  if (isSuccess) {
    emit('closeDialog');
    if (route.fullPath?.includes('forgot-password')) {
      router.push({ name: 'home' })
    }
    else {
      redirectPath()
    }
  }



}

</script>
