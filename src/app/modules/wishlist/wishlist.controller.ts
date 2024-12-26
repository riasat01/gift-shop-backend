import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { WishlistServices } from "./wishlist.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const addProductToWishlist = catchAsync(async (req, res) => {
    const result = await WishlistServices.addProductToWishlistIntoDB(
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products added to wishlist successfully`,
        data: result,
    });
});

const deleteProductFromWishlist = catchAsync(async (req, res) => {
    const result = await WishlistServices.deleteProductFromWishlistFromDB(
        req.params.productId,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products deleted from wishlist successfully`,
        data: result,
    });
});

const getProductsInWishlistByUser = catchAsync(async (req, res) => {
    const result = await WishlistServices.getProductsInWishlistByUserFromDB(
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products retrieved from wishlist successfully`,
        data: result,
    });
});

export const WishlistController = {
    addProductToWishlist,
    deleteProductFromWishlist,
    getProductsInWishlistByUser,
};
