import { JwtPayload } from "jsonwebtoken";
import CustomError from "../../error/CustomError";
import { IProduct } from "./product.interface";
import httpStatus from "http-status";
import Product from "./product.model";

const createProductIntoDB = async (
    payload: Partial<IProduct>,
    user: JwtPayload,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.UNAUTHORIZED,
            `Couldn't find the seller`,
            `createProductIntoDB`,
        );
    }

    if (user.role !== `Seller`) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `Only seller can add product`,
            `createProductIntoDB`,
        );
    }
    const newProduct: IProduct = {
        seller: user._id,
        ...payload,
    } as IProduct;
    const result = await Product.create(newProduct);
    return result;
};

const updateProductIntoDB = async (
    payload: Partial<IProduct>,
    user: JwtPayload,
    id: string,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.UNAUTHORIZED,
            `Couldn't find the seller`,
            `updateProductIntoDB`,
        );
    }

    if (user.role !== `Seller`) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `Only seller can update product`,
            `updateProductIntoDB`,
        );
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Couldn't find the product`,
            `updateProductIntoDB`,
        );
    }

    if (user._id.toString() !== product.seller.toString()) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `Seller is not authorized to update this product`,
            `updateProductIntoDB`,
        );
    }

    const result = await Product.findByIdAndUpdate(id, payload);
    return result;
};

const deleteProductFromDB = async (user: JwtPayload, id: string) => {
    if (!user) {
        throw new CustomError(
            httpStatus.UNAUTHORIZED,
            `Couldn't find the seller`,
            `deleteProductIntoDB`,
        );
    }

    if (user.role !== `Seller`) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `Only seller can delete product`,
            `deleteProductIntoDB`,
        );
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Couldn't find the product`,
            `deleteProductIntoDB`,
        );
    }

    if (user._id.toString() !== product.seller.toString()) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `Seller is not authorized to delete this product`,
            `deleteProductIntoDB`,
        );
    }

    const result = await Product.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};

const getSpecificSellerProductFromDB = async (sellerId: string) => {
    const result = await Product.find({ seller: sellerId });
    return result;
};

const getAllProductsFromDB = async () => {
    const result = await Product.find();
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    updateProductIntoDB,
    deleteProductFromDB,
    getSpecificSellerProductFromDB,
    getAllProductsFromDB,
};
