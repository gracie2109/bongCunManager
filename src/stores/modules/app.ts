import {ref, type Ref} from 'vue'
import {defineStore} from 'pinia';
import {DEFAULT_LAYOUT, DEFAULT_THEME} from "@/setting";
import type {PAGE_LAYOUT, PAGE_THEME} from "@/types";
import {getLocalStorage, setLocalStorage} from "@/lib/utils";
import {LOCAL_STORAGE_KEY} from "@/lib/constants";

export const useAppStore = defineStore('app', () => {

    const layout: Ref<PAGE_LAYOUT> = ref(getLocalStorage(LOCAL_STORAGE_KEY.LAYOUT) || DEFAULT_LAYOUT);
    const theme: Ref<PAGE_THEME> = ref(getLocalStorage(LOCAL_STORAGE_KEY.THEME) || DEFAULT_THEME)

    function setLayout(name: PAGE_LAYOUT) {
        layout.value = name;
        setLocalStorage(LOCAL_STORAGE_KEY.LAYOUT, name)
    }

    function setTheme(name: PAGE_THEME) {
        theme.value = name;
        setLocalStorage(LOCAL_STORAGE_KEY.THEME, name)
    }

    return {
        layout,
        theme,
        setLayout,
        setTheme
    }
})