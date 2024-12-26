import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { CartServices } from "./cart.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const addProductToCart = catchAsync(async (req, res) => {
    const result = await CartServices.addProductToCartIntoDB(
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products added to Cart successfully`,
        data: result,
    });
});

const deleteProductFromCart = catchAsync(async (req, res) => {
    const result = await CartServices.deleteProductFromCartFromDB(
        req.params.productId,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products deleted from Cart successfully`,
        data: result,
    });
});

const getProductsInCartByUser = catchAsync(async (req, res) => {
    const result = await CartServices.getProductsInCartByUserFromDB(
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products retrieved from Cart successfully`,
        data: result,
    });
});

export const CartControllers = {
    addProductToCart,
    deleteProductFromCart,
    getProductsInCartByUser,
};
