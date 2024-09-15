import {ref, type Ref} from 'vue'
import {defineStore} from 'pinia';
import {DEFAULT_LAYOUT, DEFAULT_THEME} from "@/setting";
import type {IPAGE_LAYOUT, IPAGE_THEME} from "@/types";
import {getLocalStorage, setLocalStorage} from "@/lib/utils";
import {LOCAL_STORAGE_KEY} from "@/lib/constants";

export const useAppStore = defineStore('app', () => {

    const layout: Ref<IPAGE_LAYOUT> = ref(getLocalStorage(LOCAL_STORAGE_KEY.LAYOUT) || DEFAULT_LAYOUT);
    const theme: Ref<IPAGE_THEME> = ref(getLocalStorage(LOCAL_STORAGE_KEY.THEME) || DEFAULT_THEME)

    function setLayout(name: IPAGE_LAYOUT) {
        layout.value = name;
        setLocalStorage(LOCAL_STORAGE_KEY.LAYOUT, name)
    }

    function setTheme(name: IPAGE_THEME) {
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