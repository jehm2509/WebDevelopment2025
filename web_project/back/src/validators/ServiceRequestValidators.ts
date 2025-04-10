import { SERVICE_REQUEST_STATUS } from "@/constatns/constants";
import { z } from "zod";

const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const CreateServiceRequestValidator = z.object({
    client_name: z.string().min(1),
    client_email: z.string().min(1),
    client_phone: z.string().min(1),
    date: z.string().refine(val => dateTimeRegex.test(val)),
    service: z.object({
        _id: z.string().min(1),
        name: z.string().min(1)
    }),
    user: z.object({
        _id: z.string().min(1),
        name: z.string().min(1)
    })
});

export const UpdateServiceRequestValidator = z.object({
    _id: z.string().min(1),
    status: z.enum(SERVICE_REQUEST_STATUS)
});


export const ListServiceRequestValidator = z.object({});

export const DeleteServiceRequestValidator = z.object({});