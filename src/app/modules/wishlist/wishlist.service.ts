import { JwtPayload } from "jsonwebtoken";
import Wishlist from "./wishlist.model";
import CustomError from "../../error/CustomError";
import httpStatus from "http-status";
import { IWishlistProduct } from "./wishlist.interface";

const addProductToWishlistIntoDB = async (
    products: Partial<IWishlistProduct>[],
    user: JwtPayload,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Could not find the user`,
            `addProductToWishlistIntoDB`,
        );
    }
    const wishlist = await Wishlist.findOne({ user: user._id });
    if (!wishlist) {
        const newWishlist = await Wishlist.create({
            user: user._id,
            products: products.map(({ product }) => ({ product })),
        });
        return newWishlist;
    } else {
        await Wishlist.updateOne(
            { user: user._id },
            {
                $push: {
                    products: {
                        $each: products.map(({ product }) => ({ product })),
                    },
                },
            },
        );
        return await Wishlist.findOne({ user: user._id });
    }
};

const deleteProductFromWishlistFromDB = async (
    productId: string,
    user: JwtPayload,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Could not find the user`,
            `deleteProductFromWishlistFromDB`,
        );
    }

    const wishlistOfUser = await Wishlist.findOne({ user: user._id });
    if (!wishlistOfUser) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Wishlist not found`,
            `deleteProductFromWishlistFromDB`,
        );
    }

    const wishlist = await Wishlist.findOneAndUpdate(
        {
            user: user._id,
            "products.product": productId,
        },
        {
            $set: {
                "products.$.isDeleted": true,
            },
        },
        {
            new: true,
        },
    );
    if (!wishlist) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Wishlist or product not found`,
            `deleteProductFromWishlistFromDB`,
        );
    }
    return wishlist;
};

const getProductsInWishlistByUserFromDB = async (user: JwtPayload) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Could not find the user`,
            `getProductsInWishlistByUserFromDB`,
        );
    }

    const wishlist = await Wishlist.findOne({ user: user._id }).populate({
        path: "products.product",
        select: "-isDeleted",
    });
    if (!wishlist) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Wishlist not found`,
            `getProductsInWishlistByUserFromDB`,
        );
    }

    const filteredProducts = wishlist.products.filter(
        (product) => !product.isDeleted,
    );

    return filteredProducts;
};

export const WishlistServices = {
    addProductToWishlistIntoDB,
    deleteProductFromWishlistFromDB,
    getProductsInWishlistByUserFromDB,
};
