import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {CalendarDateTime} from "@internationalized/date";
import type {RestfullMethod, ResponseStatus} from "@/types";
import {toast} from "vue-sonner";
import i18n from '@/i18n';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStorageValue (key: string) {
  if(!key) return null;
  return JSON.parse(JSON.stringify(localStorage.getItem(key)));
}

export function getCurrentDateTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return  new CalendarDateTime(year,month, day, hours, minutes,  seconds)

}

export function sendMessageToast(status: ResponseStatus, method: RestfullMethod, toastType: 'success' |'error' | 'default', message?: string) {
  if(!(status || method || toastType)) return;

  if(toastType === 'success') return toast.success(i18n.global.t(`common.success`, {action: i18n.global.t(`common.${method}`)}));
  else if (toastType === 'error') return toast.error(i18n.global.t('common.fail', {action: i18n.global.t(`common.${method}`), mess: message}));
  else toast(i18n.global.t(`common.${status}`, {action: i18n.global.t(`common.${method}`)}))
}

export function setLocalStorage (key: string, data:any) {
  if(!key) return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key:string) {
  if(!key) return;
  return JSON.parse(JSON.stringify(localStorage.getItem(key)));
}


export function truncateText(text: string, maxLength: number) {
  const newText = text.slice(0, maxLength);
  return text.length > maxLength ? `${newText}...`: newText;
}