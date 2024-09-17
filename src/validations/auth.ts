import * as z from 'zod';
import { ConfirmPassSchema, EmailSChema, passWordCheck, validEmail, validMinString } from "."



export const loginSchema = z.object({
    email: validEmail,
    password: validMinString('password', 4),
})


export const registerSchema = z
    .object({
        displayName: z.string().min(3, {
            message: "Name must be at least 5 characters.",
        }),
        email: validEmail,
    })
    .merge(ConfirmPassSchema)
    .superRefine(passWordCheck);




