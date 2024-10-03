import * as z from 'zod';
import { validMinString } from '.';

export const PetsValid = z.object({
    name: validMinString('name', 3),
    icon: z.any(),
    desc: validMinString('desc', 3),
   
})  