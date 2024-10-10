<template>
  <Header>
    <h1 class="font-semibold flex items-center gap-2">Service Combo</h1>
  </Header>

  <ContentWrap>
    <div class="bg-white min-h-svh p-5 space-y-6">
      <Button>
        <Plus class="size-4" />
        Add new
      </Button>
      <div class="container">
        <div class="grid grid-cols-2 gap-6">
          <div v-for="(i, j) in Array(4)" :key="j">
            <div
              class="h-60 w-full"
              :class="{
                border_odd: j % 2 !== 0,
                border_even: j % 2 === 0,
              }"
            >
              <div class="content p-8 h-full">
                <h1 class="font-semibold text-3xl">Gói tắm cơ bản</h1>
                <span>{{ content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { Plus } from "lucide-vue-next";
import ContentWrap from "../../components/ContentWrap.vue";
import Header from "../../components/Header.vue";
import { Button } from "@/components/ui/button";

const content = "Tắm + Cắt tạo kiểu + Vệ sinh Tai, Móng và Răng miệng";
</script>

<style scoped>
.border_odd {
    -webkit-border-top-left-radius: 60px;
-webkit-border-bottom-right-radius: 60px;
-moz-border-radius-topleft: 60px;
-moz-border-radius-bottomright: 60px;
border-top-left-radius: 60px;
border-bottom-right-radius: 60px;
  border: 1px solid hsl(var(--primary));
}

.border_even {
  -webkit-border-top-right-radius: 60px;
  -webkit-border-bottom-left-radius: 60px;
  -moz-border-radius-topright: 60px;
  -moz-border-radius-bottomleft: 60px;
  border-top-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border: 1px solid hsl(var(--primary));
}
</style>
