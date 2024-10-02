import { getLocalStorage, getCurrentDateTime } from "@/lib/utils";
import type { LinkProp } from "@/types";

export const USER_LOCALE = JSON.parse(getLocalStorage('user-locale'));
export const CURRENT_DATE = getCurrentDateTime();

export const COLLECTION = {
    PRODUCTS: 'products',
    USERS: 'users',
    PROVIDERS: 'service-provider'
}

export const DEFINE_PRODUCT_CATEGORIES = [
    {
        value: 'food_n_beverage',
        vi_name: "Đồ ăn & Đồ uống",
        en_name: "Food & beverage"
    },
    {
        value: 'other',
        vi_name: "Vật tư",
        en_name: "Other"
    }
]

export const PAGE_LAYOUT = {
    'ADMIN': 'admin',
    'CLIENT': 'client',
    'NO_LAYOUT': 'empty',
    'AUTH': 'auth'
} as const;

export const PAGE_THEME = {
    'LIGHT': 'light',
    'DARK': 'dark',
    'SYSTEM': 'system',
} as const;

export const DEFAULT_ROLE = {
    'CUSTOMER': 'customer',
    'ADMIN': 'admin',
    'SUPER_ADMIN': 'superAdmin',
    'CASHIER': 'cashier'
} as const;



export const LOCAL_STORAGE_KEY = {
    'LAYOUT': 'layout',
    'THEME': 'theme',
    'VISIBLE_COLUMN':'visibleColumn'
}


export const HEADER_ADVANCE_FUNCTION = {
    'FILTER': 'filter',
    'RESET':'reset',
    'EXPORT':"export",
    'IMPORT':"import",
    'ADD_NEW':'addNew',
    'SETTING_COLUMN':'settingColumn'
} as const;


export const PROVIDER_KEYS = {
    'IS_COLLAPSE':'isCollapsed',
}

export const GLOBAL_FUNCTION_TYPE = {
    'DELETE': 'Delete',
    'EDIT': 'Edit'
}

export const INITIAL_PAGE_INDEX = 1
export const INITIAL_PAGE_SIZE = 5

export const PAGE_SIZES = [2, 5, 10, 20, 30, 40, 50]

export const navigation = {
    adminNav: [
        {
            path: 'dashboard',
            name: 'dashboardOverview'
        },
        {
            path: 'orders',
            name: 'orders'
        },
        {
            path: 'vouchers',
            name: 'vouchers'
        },
        {
            path: 'brands',
            name: 'adminBrands',
        },
        {
            path: 'products',
            name: 'adminProducts',
        },
        {
            path: 'collections',
            name: 'adminCollections',
        },
        {
            path: 'settings',
            name: 'adminSetting'
        }
    ],
    settingNav: [
        {
            path: 'roles',
            name: 'adminSettingRoleList',
            icon: '',
        },
        {
            path: 'permissions',
            name: 'adminSettingPermissionList',
            icon: ''
        }
    ],
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
            url: '/'
        },
        {
            text: 'About Us',
            url: '#'
        },
        {
            text: 'Contact',
            url: '#'
        },
        {
            text: 'Coupons',
            url: '#'
        }
    ]
}