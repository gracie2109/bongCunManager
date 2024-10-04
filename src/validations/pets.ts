import * as z from 'zod';
import { validMinString } from '.';

export const PetsValid = z.object({
    name: validMinString('name', 3),
    icon: z.any(),
    desc: validMinString('desc', 3),
   
});


export const PetsServicesValid = z.object({
    name: validMinString('name', 3),
        desc: validMinString('desc', 3),
        petIds: z.any(),
        petsProfiles: z.any()
});


