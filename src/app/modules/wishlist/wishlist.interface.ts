import { Types } from "mongoose";

export interface IWishlistProduct {
    product: Types.ObjectId;
    isDeleted: boolean;
}

export interface IWishlist {
    user: Types.ObjectId;
    products: IWishlistProduct[];
}
