import * as Vue from "vue";

import { createRouter, createWebHistory, useRouter } from "vue-router";

import ComboServiceView from "@/views/admin/pets/service-combo/Index.vue";
import ContactView from "@/views/client/contact/ContactView.vue";
import DashboardView from "@/views/admin/dashboard/DashboardView.vue";
import DetailPetServicePrice from "@/views/admin/pets/services-price/Detail.vue";
import DetailScheduleOrder from "@/views/admin/schedule/order-services/detail/Index.vue"
import ForgotPassView from "@/views/auth/ForgotPassView.vue";
import HomeView from "@/views/HomeView.vue";
import ListPetServices from "@/views/admin/pets/services/Index.vue";
import ListPets from "@/views/admin/pets/Index.vue";
import ListScheduleOrder from "@/views/admin/schedule/order-services/list/Index.vue";
import ListUserGroupView from "@/views/admin/users/user-groups/Index.vue";
import ListUserView from "@/views/admin/users/ListView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import NotFoundPage from "@/components/NotFoundPage.vue";
import { PAGE_LAYOUT } from "@/lib/constants";
import PermissionView from "@/views/admin/settings/permissions/Index.vue";
import PetOverview from "@/views/admin/pets/overview/Index.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import SettingPetServicePrice from "@/views/admin/pets/services-price/Index.vue";
import SettingView from "@/views/admin/settings/SettingView.vue";
import i18n from "@/i18n";
import { useAuthStore } from "@/stores";

/*
 *   RULE:
 *   meta key cần đối chiếu với pageMeta trong file i18n/locales/[lang].json
 *
 * */

const AUTH_PATH = ["login", "register"];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || ""),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        key: "home",
        layout: PAGE_LAYOUT.CLIENT,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        key: "login",
        layout: PAGE_LAYOUT.AUTH,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        key: "register",
        layout: PAGE_LAYOUT.AUTH,
      },
    },
    {
      path: "/forgot-password",
      name: "forgotPw",
      component: ForgotPassView,
      meta: {
        key: "forgotPw",
        layout: PAGE_LAYOUT.AUTH,
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: {
        key: "contact",
        layout: PAGE_LAYOUT.CLIENT,
      },
    },
    {
      path: "/admin/",
      name: "admin",
      meta: {
        layout: PAGE_LAYOUT.ADMIN,
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "users",
          name: "users",
          component: ListUserView,
        },
        {
          path: "users-groups",
          name: "usersGroup",
          component: ListUserGroupView,
        },
        {
          path: "pets",
          children: [
            {
              path: "",
              name: "pets",
              component: ListPets,
              meta: {
                key: "pets",
              },
            },
            {
              path: ":petId/setting-pet-service-price",
              name: "settingPetServicePrice",
              component: SettingPetServicePrice,
              meta: {
                key: "settingPetServicePrice",
              },
            },
            {
              path: ":petId/setting-pet-service-price/:serviceId",
              name: "DetailPetService",
              component: DetailPetServicePrice,
              meta: {
                key: "settingPetServicePrice",
              },
            },
            {
              path: "services",
              name: "petService",
              component: ListPetServices,
              meta: {
                key: "settingPetServicePrice",
              },
            },
            {
              path: "overview",
              name: "petOverview",
              component: PetOverview,
              meta: {
                key: "settingPetServicePrice",
              },
            },
            {
              path: "service-combos",
              name: "petServiceCombo",
              component: ComboServiceView,
              meta: {
                key: "settingPetServicePrice",
              },
            },
            // {
            //   path: "services-create",
            //   name: "petServiceCreate",
            //   component: CreatePetServices,
            //   meta: {
            //     key: "settingPetServicePrice",
            //   },
            // },
          ],
        },
        {
          path: "schedule",
          children: [
            {
              path: "list-order-schedule",
              name: "listOrderSchedule",
              component: ListScheduleOrder,
              meta: {
                key: "schedule",
              },
            },
            {
              path: "list-order-schedule/:id",
              name: "detailOrderScheduleDetail",
              component: DetailScheduleOrder,
              meta: {
                key: "schedule",
              },
            },
          ],
        },
        {
          path: "settings",
          children: [
            {
              path: "",
              name: "settings",
              component: SettingView,
              meta: {
                key: "pets",
              },
            },
            {
              path: "permissions",
              name: "permissions",
              component: PermissionView,
              meta: {
                key: "pets",
              },
            },
          ],
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      meta: {
        layout: PAGE_LAYOUT.NO_LAYOUT,
        requiresAuth: true,
      },
      component: NotFoundPage,
    },
  ],
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = i18n.global.t(`pageMeta.${to.meta.key}`);
  });
});
router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();
  const nav = useRouter();

  if (AUTH_PATH.includes(to.meta.key as string) && userStore.currentUser) {
    nav.go(-1);
  }

  if (to.meta.requiresAuth && !userStore.currentUser) {
    nav.replace({ name: "home" });
  } else next();
});

export default router;
