import type { LinkProp } from "@/types";

export const ADMIN_NAVIGATOR: LinkProp[] = [
    {
      title: 'suppliers',
      icon: 'lucide:container',
      variant: 'ghost',
      name: 'suppliers'
    },
    {
      title: 'customers',
      icon: 'lucide:user-2',
      variant: 'ghost',
      name: 'users'
    },
    {
      title: 'pets',
      icon: 'lucide:paw-print',
      variant: 'ghost',
      name: 'pets'
    },
  ]
  
  export const navigation = {
    profileNav: [
        {
            path: 'general',
            name: 'general',
            icon: ''
        },
        {
            path: 'address',
            name: 'address',
            icon: ''
        },
        {
            path: 'transactions',
            name: 'transactions',
            icon: ''
        }
    ],
    clientNav: [
        {
            text: 'Home',
            name: 'home'
        },
        {
            text: 'About Us',
            name: 'home'
        },
        {
            text: 'Contact',
            name: 'contact'
        },
        {
            text: 'Coupons',
            name: 'home'
        }
    ]
}