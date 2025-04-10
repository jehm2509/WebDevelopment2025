import { z } from "zod";

export const CreateServiceValidator = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.number().min(1),
    users: z.array(
        z.object({
            _id: z.string().min(1),
            name: z.string().min(1)
        })
    ).min(1),
});

export const updateServiceValidator = z.object({
    _id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.number().min(1),
    users: z.array(
        z.object({
            _id: z.string().min(1),
            name: z.string().min(1)
        })
    ).min(1),
});

export const ListServiceValidator = z.object({});

export const DeleteServiceValidator = z.object({});