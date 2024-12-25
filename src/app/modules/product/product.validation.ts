import { z } from "zod";
import { ProductCategory } from "./product.constant";

const createProductImageURLSchema = z.object({
    imageUrl: z
        .string({
            required_error: "Image URL is required",
            invalid_type_error: "Image URL must be a string",
        })
        .url("Invalid URL format"),
});

const createProductSchema = z.object({
    name: z.string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be a string",
    }),
    description: z.string({
        required_error: "Product description is required",
        invalid_type_error: "Product description must be a string",
    }),
    price: z
        .number({
            required_error: "Product price is required",
            invalid_type_error: "Product price must be a number",
        })
        .nonnegative("Product price must be a non-negative number"),
    brand: z.string({
        required_error: "Product brand is required",
        invalid_type_error: "Product brand must be a string",
    }),
    category: z.enum([...ProductCategory] as [string, ...string[]], {
        required_error: "Product category is required",
        invalid_type_error: "Product category must be a valid enum value",
        errorMap: () => ({
            message: `Product category must be one of these ${ProductCategory.join(", ")}`,
        }),
    }),
    images: z
        .array(createProductImageURLSchema, {
            required_error: "Product image is required",
            invalid_type_error: "Product images must be an array of image URLs",
        })
        .nonempty(),
    stock: z
        .number({
            invalid_type_error: "Stock must be a number",
        })
        .int()
        .nonnegative()
        .default(0),
});

export const ProductValidations = {
    createProductSchema,
};
