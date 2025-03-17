import { ROLES } from "@/constatns/constants";
import { z } from "zod";

export const CreateUserValidator = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    role: z.enum(ROLES)
});

export const LoginUserValidator = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});
