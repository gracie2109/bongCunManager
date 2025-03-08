import * as z from 'zod'
import {validMinString, validCanNull, validEmail, validPhoneNumber} from "."
import i18n from "@/i18n";

export const REGISTER_PARAMS = {
    NAME: "name",
    TIME: "time",
    PHONE_NUMBER: "phone_number",
    EMAIL: "email",
    CONTENT: "content",
  };
const t = i18n.global.t
export const registerFormSchema = z.object({
    [REGISTER_PARAMS.NAME]: validMinString(t('pageFields.products.name'), 3),
    [REGISTER_PARAMS.EMAIL]: validEmail,
    [REGISTER_PARAMS.PHONE_NUMBER]: validPhoneNumber,
    [REGISTER_PARAMS.TIME]: validMinString(t('pageFields.products.name'), 3),

})

export type InferRegsiterFormInfo = z.infer<typeof registerFormSchema>