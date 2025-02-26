import type { LinkProp } from "@/types";
import { Settings2 } from "lucide-vue-next";

export const ADMIN_NAVIGATOR: LinkProp[] = [
  {
    title: "customers",
    icon: "lucide:user-2",
    name: "users",
  },
  {
    title: "pets",
    icon: "lucide:paw-print",
    name: "pets",
    children: [
      {
        title: "Overview",
        icon: "lucide:image",
        name: "petOverview",
      },
      {
        title: "Manager Pets",
        icon: "lucide:align-left",
        name: "pets",
      },
      {
        title: "Manager Pets Service",
        icon: "carbon:settings-services",
        name: "petService",
        
      },
      {
        title: "Combo",
        icon: "lucide:layers-2",
        name: "petServiceCombo",
      },
    ],
  },
  {
    title: "schedule",
    icon: "lucide:calendar-days",
    name: "listOrderSchedule",
  },
  {
    title: "settings",
    icon: "lucide:cog",
    name: "settings",
  },
];
export const navigation = {
  profileNav: [
    {
      path: "general",
      name: "general",
      icon: "",
    },
    {
      path: "address",
      name: "address",
      icon: "",
    },
    {
      path: "transactions",
      name: "transactions",
      icon: "",
    },
  ],
  clientNav: [
    {
      text: "Home",
      name: "home",
    },
    {
      text: "About Us",
      name: "about-us",
    },
    {
      text: "Contact",
      name: "contact",
    },
    {
      text: "Products",
      name: "products",
      type: 'multi'
    },
    {
      text: "Coupons",
      name: "coupons",
    },
  ],
};
