import { Schema } from "mongoose";
import { IWishlist } from "./wishlist.interface";
import { model } from "mongoose";

const wishlistSchema = new Schema<IWishlist>(
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
                isDeleted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    { timestamps: true },
);

const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
