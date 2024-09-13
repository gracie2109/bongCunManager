import {getStorageValue, getCurrentDateTime} from "@/lib/utils";

export const USER_LOCALE = getStorageValue('user-locale');

export const CURRENT_DATE = getCurrentDateTime();

export const COLLECTION = {
    PRODUCTS: 'products',
    USERS:'users'
}

export const DEFINE_PRODUCT_CATEGORIES =[
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
}

export const LOCAL_STORAGE_KEY = {
    'LAYOUT': 'layout',
    'THEME':'theme'
}


export const navigation = {
    adminNav:[
        {
            path: 'dashboard',
            name:'dashboardOverview'
        },
        {
            path: 'orders',
            name:'orders'
        },
        {
            path: 'vouchers',
            name:'vouchers'
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
            name:'adminSetting'
        }
    ],
    settingNav :[
        {
            path: 'roles',
            name: 'adminSettingRoleList',
            icon:'',
        },
        {
            path: 'permissions',
            name: 'adminSettingPermissionList',
            icon:''
        }
    ],
    profileNav:[
        {
            path: 'general',
            name: 'general',
            icon:''
        },
        {
            path: 'address',
            name: 'address',
            icon:''
        },
        {
            path: 'transactions',
            name: 'transactions',
            icon:''
        }
    ],
    clientNav:[
        {
            text: 'Home',
            url: '/'
        },
        {
            text: 'About Us',
            url: '/about-us'
        },
        {
            text: 'Contact',
            url: '/contact'
        },
        {
            text:'Coupons',
            url:'/coupons'
        }
    ]
}