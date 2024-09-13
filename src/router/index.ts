import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import i18n from '@/i18n';
import * as  Vue from 'vue';
import { PAGE_LAYOUT } from "@/lib/constants"
import LoginView from '@/views/auth/LoginView.vue';
import  RegisterView from '@/views/auth/RegisterView.vue';
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
        layout: PAGE_LAYOUT.AUTH
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        key: 'register',
        layout: PAGE_LAYOUT.AUTH
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
