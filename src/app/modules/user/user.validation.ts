import { z } from "zod";
import { UserRoles } from "./user.constant";

const createUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: `Invalid email address` }),
        role: z.enum([...UserRoles] as [string, ...string[]]),
        firebaseUID: z.string({
            required_error: `Firebase ID is required`,
            invalid_type_error: `Firebase ID must be a string`,
        }),
        name: z.string({
            required_error: `Name is required`,
            invalid_type_error: `Name must be a string`,
        }),
        phone: z.string().optional(),
    }),
});

export const UserValidations = {
    createUserValidationSchema,
};
