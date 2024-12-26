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

// Pre hook to filter out deleted products before any find query
cartSchema.pre("find", function (next) {
    this.where({ "products.isDeleted": { $ne: true } });
    next();
});

// Pre hook to filter out deleted products before any findOne query
cartSchema.pre("findOne", function (next) {
    this.where({ "products.isDeleted": { $ne: true } });
    next();
});

// Post hook to filter out deleted products from the result
cartSchema.post("find", function (docs: ICart[]) {
    docs.forEach((doc) => {
        doc.products = doc.products.filter((product) => !product.isDeleted);
    });
});

cartSchema.post("findOne", function (doc: ICart) {
    if (doc) {
        doc.products = doc.products.filter((product) => !product.isDeleted);
    }
});

const Cart = model<ICart>("Cart", cartSchema);
export default Cart;
