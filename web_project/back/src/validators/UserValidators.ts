import { ROLES } from "@/constatns/constants";
import { z } from "zod";

export const CreateUserValidator = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    role: z.enum(ROLES),
    company: z.object({
        _id: z.string().min(1),
        name: z.string().min(1)
    }).optional()
});

export const LoginUserValidator = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});

export const UpdateUserValidator = z.object({
    _id: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.string().min(1),
    company: z.object({
        _id: z.string().min(1),
        name: z.string().min(1)
    }).optional()
});

export const ListUserValidator = z.object({});

export const DeleteUserValidator = z.object({});

export const ForgotPasswordValidator = z.object({
    email: z.string().email()
});

export const SaveForgotPasswordValidator = z.object({
    token: z.string().min(1),
    new_password: z.string().min(1)
});