import { z } from "zod";


export const CreateProductValidator = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0)
});


export const ListProductValidator = z.object({});