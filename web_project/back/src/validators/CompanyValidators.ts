import { z } from "zod";


export const CreateCompanyValidator = z.object({
    name: z.string().min(1),
});

export const UpdateCompanyValidator = z.object({
    _id: z.string().min(1),
    name: z.string().min(1),
});


export const ListCompanyValidator = z.object({});

export const DeleteCompanyValidator = z.object({});