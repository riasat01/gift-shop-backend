import { Types } from "mongoose";

export type TProductCategory =
    | "Toys"
    | "Home Decor"
    | "Clothing"
    | "Beauty"
    | "Electronics"
    | "Books"
    | "Accessories"
    | "Others";

export interface IProductImageURL {
    imageUrl: string;
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    brand: string;
    category: TProductCategory;
    images: IProductImageURL[];
    seller: Types.ObjectId;
    stock: number;
    isDeleted: boolean;
}
