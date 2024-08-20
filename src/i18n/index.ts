import { createI18n } from 'vue-i18n'
import pluralRules from './rules/pluralization'
import numberFormats from './rules/numbers'
import datetimeFormats from './rules/datetime'
import vi from './locales/vi.json'
import en from './locales/en.json';
import { USER_LOCALE } from "@/lib/constants";

export default createI18n({
  locale: USER_LOCALE || import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: { vi, en },
  ...numberFormats,
  ...datetimeFormats,
  pluralRules,
})
