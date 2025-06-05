import { z } from "zod";

export const CreateContactValidator = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    phone: z.string().optional(),
    cellphone: z.string().optional(),
    email: z.string().min(1).email()
});

export const UpdateContactValidator = z.object({
    _id: z.string().min(1),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    phone: z.string().optional(),
    cellphone: z.string().optional(),
    email: z.string().min(1).email()
});

export const ListContactValidator = z.object({});

export const DeleteContactValidator = z.object({});