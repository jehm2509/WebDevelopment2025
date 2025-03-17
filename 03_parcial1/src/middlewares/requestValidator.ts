import { ROLES } from "@/constatns/constants";
import { validateToken } from "@/helpers/Auth";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
    (schema: ZodSchema<any>, requireAuth: boolean = false, requireAdmin: boolean = false) =>
        (request: Request, response: Response, next: NextFunction): void => {

            // validate jwt token if necesary
            if (requireAuth || requireAdmin) {

                const validatedToken = validateToken(request);
                if (!validatedToken.success) {
                    response.status(400).send({ message: 'Unauthorized!' });
                    return;
                }

                if (requireAdmin && validatedToken.role != ROLES[0]) {
                    response.status(400).send({ message: 'Unauthorized!' });
                    return;
                }

            }

            // validate params usgin zod schema
            const result = schema.safeParse(request.body);

            if (!result.success) {
                response.status(400).json({ error: result.error.format() });
                return; // 👈 stop process
            }

            // replace body with validated data
            request.body = result.data;

            next(); // 👈 Contine with stack methods
        };