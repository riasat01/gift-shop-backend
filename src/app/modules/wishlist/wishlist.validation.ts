import { z } from "zod";

const wishlistProductSchema = z.object({
    product: z.string({
        required_error: "Product ID is required",
        invalid_type_error: "Product ID must be a string",
    }),
});

const createWishlistValidationSchema = z.object({
    body: z.object({
        products: z.array(wishlistProductSchema),
    }),
});

export const WishlistValidations = {
    createWishlistValidationSchema,
};
