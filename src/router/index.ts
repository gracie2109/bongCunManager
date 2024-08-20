import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import i18n from '@/i18n';
import * as  Vue from 'vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || ''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        key:'home',
        view: 'normal'
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
