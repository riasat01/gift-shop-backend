import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";
import { ProductCategory } from "./product.constant";

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, `Product name is required`],
        },
        description: {
            type: String,
            required: [true, `Product description is required`],
        },
        price: {
            type: Number,
            required: [true, `Product price is required`],
        },
        brand: {
            type: String,
            required: [true, `Product brand is required`],
        },
        category: {
            type: String,
            required: [true, `Product category is required`],
            enum: {
                values: ProductCategory,
                message: `Product category must be one of these ${ProductCategory}. {VALUE} is not valid`,
            },
        },
        images: {
            type: [
                {
                    imageUrl: String,
                },
            ],
            required: [true, `Product image is required`],
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, `Product seller is required`],
        },
        stock: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
