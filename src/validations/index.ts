import * as z from 'zod';
import i18n from "@/i18n"

const t = i18n.global.t;
export const validMinString = (name:string, min:number) => z.string()
.min(min, {
    message: t('validation.min', {name: name, min:min}) 
});
export const validaMaxString= (name:string, min:number, max:number) => z.string().max(max, {message: `${name} must be at least ${max} characters`});
export const validMinMaxString= (name:string, min:number, max:number) =>
    z.string()
        .max(max, {message: `${name} must be at least ${max} characters`})
        .min(min, {message:  `${name} must be at least ${min} characters`})

export const validCanNull = (name:string) =>z.any().optional().transform(value => value || null)
export const arrayNeedAtLeastOne = (name: string) => z.array(z.any()).refine(value => value.some(item => item), {
    message: `${name} need to have at least one item.` ,
})
