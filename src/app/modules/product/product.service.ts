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

export const ProductServices = {
    createProductIntoDB,
};
