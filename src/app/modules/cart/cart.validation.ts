import { z } from "zod";

const cartProductSchema = z.object({
    product: z.string({
        required_error: "Product ID is required",
        invalid_type_error: "Product ID must be a string",
    }),
    quantity: z.number().int().positive(),
});

const createCartValidationSchema = z.object({
    body: z.object({
        products: z.array(cartProductSchema),
    }),
});

export const WishlistValidations = {
    createCartValidationSchema,
};
