import { z } from "zod";

export const CreateUserValidator = z.object({
    username: z.string().email(),
    password: z.string().min(6)    
});

export const LoginUserValidator = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});

export const ListUserValidator = z.object({});

export const DeleteUserValidator = z.object({});
