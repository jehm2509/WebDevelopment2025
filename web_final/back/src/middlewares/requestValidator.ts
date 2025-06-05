import { STATUS_CODES } from "@/constatns/constants";
import { validateToken } from "@/helpers/Auth";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =
    (schema: ZodSchema<any>, requireAuth: boolean = false) =>
        (request: Request, response: Response, next: NextFunction): void => {

            let _user_id = null;

            // validate jwt token if necesary
            if (requireAuth) {

                const validatedToken = validateToken(request);
                if (!validatedToken.success) {
                    response.status(STATUS_CODES.UNAUTHORIZED).send({ message: 'Unauthorized!' });
                    return;
                }

                // assign user id
                _user_id = validatedToken.userId;
            }

            // validate params usgin zod schema
            const result = schema.safeParse(request.body ?? {});

            if (!result.success) {
                response.status(STATUS_CODES.VALIDATION_FAIL).json({ error: result.error.format() });
                return; // 👈 stop process
            }

            // replace body with validated data
            request.body = { ...result.data, _user_id };

            next(); // 👈 Contine with stack methods
        };