import { Types } from "mongoose";

export interface ICartProduct {
    product: Types.ObjectId;
    quantity: number;
    isDeleted: boolean;
}

export interface ICart {
    user: Types.ObjectId;
    products: ICartProduct[];
    totalPrice: number;
}
