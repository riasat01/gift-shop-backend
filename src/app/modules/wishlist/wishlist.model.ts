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

// Pre hook to filter out deleted products before any find query
wishlistSchema.pre("find", function (next) {
    this.where({ "products.isDeleted": { $ne: true } });
    next();
});

// Pre hook to filter out deleted products before any findOne query
wishlistSchema.pre("findOne", function (next) {
    this.where({ "products.isDeleted": { $ne: true } });
    next();
});

// Post hook to filter out deleted products from the result
wishlistSchema.post("find", function (docs: IWishlist[]) {
    docs.forEach((doc) => {
        doc.products = doc.products.filter((product) => !product.isDeleted);
    });
});

wishlistSchema.post("findOne", function (doc: IWishlist) {
    if (doc) {
        doc.products = doc.products.filter((product) => !product.isDeleted);
    }
});

const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
