import {getStorageValue, getCurrentDateTime} from "@/lib/utils";

export const USER_LOCALE = getStorageValue('user-locale');

export const CURRENT_DATE = getCurrentDateTime();

export const COLLECTION = {
    PRODUCTS: 'products'
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

