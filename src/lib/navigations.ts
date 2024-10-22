import type { LinkProp } from "@/types";

export const ADMIN_NAVIGATOR: LinkProp[] = [
  {
    title: "customers",
    icon: "lucide:user-2",
    variant: "ghost",
    name: "users",
  },
  // {
  //   title: "Groups",
  //   icon: "lucide:users-round",
  //   variant: "ghost",
  //   name: "usersGroup",
  // },

  {
    title: "pets",
    icon: "lucide:paw-print",
    variant: "ghost",
    name: "pets",
    children: [
      {
        title: "Combo",
        icon: "lucide:paw-print",
        name: "pets",
        variant: "ghost",
      },
    ],
  },
  {
    title: "settings",
    icon: "lucide:cog",
    variant: "ghost",
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
      name: "home",
    },
    {
      text: "Contact",
      name: "contact",
    },
    {
      text: "Coupons",
      name: "home",
    },
  ],
};
