<template>
  <div class="footer">
    <div class="container">
      <div class="flex gap-8 justify-between flex-wrap">
        <div class="space-y-6 text-[#828282]">
          <div class="w-[50%] max-w-[150px]">
            <AppLogo />
          </div>
          <div class="mt-5 flex gap-4 flex-wrap">
            <div
              v-for="(i, ii) in navigation.clientNav"
              :key="ii"
              class="capitalize cursor-pointer + text-sm"
            >
              <RouterLink
                :to="i.name"
            
                class="hover:text-primary after:ml-2 after:text-[#828282]"
                :class="{
                  'after:content-[\'|\']':
                    ii !== navigation.clientNav.length - 1,
                }"
              >
                {{ i.text }}
              </RouterLink>
            </div>
          </div>
          <Separator class="text-[#828282]" />
          <p>Powered by @gracie2109</p>
        </div>

        <div class="space-y-3">
          <p>🏡 Địa chỉ: <span>Yên Nghĩa, Hà Đông, Hà Nội</span></p>
          <p>☎️ Liên hệ:: <span>0327072255</span></p>
          <p>💌 Emai: <span>admin@gmail.com</span></p>
          <p>🔍 Website: <span>admin@gmail.com</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from "./common/AppLogo.vue";
import { Separator } from "@/components/ui/separator";

import { navigation } from "@/lib/navigations";
</script>

<style scoped>
.footer {
  background-color: rgb(30, 33, 33);
  padding: 40px 15px;
  color: #828282;
}
</style>
