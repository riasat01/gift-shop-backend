import { Schema } from "mongoose";
import { model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                isDeleted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;
