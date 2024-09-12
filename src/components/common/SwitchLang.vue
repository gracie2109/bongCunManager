<template>

  <div class="flex gap-4 items-center  cursor-pointer">

    <div :class="{'disable':  locale !=='en'}"  @click="switchLanguage('en')">
      <img alt="" class="w-7 h-7 object-cover inline-block " src="../../assets/flags/uk.png">
    </div>
    <div :class="{'disable': locale !== 'vi'}" @click="switchLanguage('vi')">
      <img alt="" class="w-7 h-7  object-cover inline-block " src="../../assets/flags/vietnam.png">
    </div>
  </div>
</template>


<script lang="ts" setup>
import Tr from "@/i18n/translation"
import { useRouter } from "vue-router";
import {nextTick, ref} from "vue";

const locale = ref(Tr.getPersistedLocale() || Tr.defaultLocale);
const router = useRouter();

const switchLanguage = async (newLocale: string) => {
  await Tr.switchLanguage(newLocale)
  await nextTick();
  locale.value = Tr.getPersistedLocale()
  try {
    // await router.replace({params: {locale: newLocale}});
    // router.go(0)
  } catch (e) {
    console.log(e)
    router.push("/")
  }
}

</script>
<style scoped>
.disable > img {
  filter: grayscale(100%);
}
</style>
