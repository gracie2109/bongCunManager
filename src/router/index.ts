import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import i18n from '@/i18n';
import * as  Vue from 'vue';
import { PAGE_LAYOUT } from "@/lib/constants"
import LoginView from '@/views/auth/LoginView.vue';
/*
*   RULE:
*   meta key cần đối chiếu với pageMeta trong file i18n/locales/[lang].json
*
* */

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || ''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        key: 'home',
        layout: PAGE_LAYOUT.CLIENT,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        key: 'login',
        layout: PAGE_LAYOUT.NO_LAYOUT
      }
    },
  ]
})
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = i18n.global.t(`pageMeta.${to.meta.key}`);
  });
});
export default router
