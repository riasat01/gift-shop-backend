import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `Product created successfully`,
        data: result,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateProductIntoDB(
        req.body,
        req.user as JwtPayload,
        req.params.id,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Product updated successfully`,
        data: result,
    });
});

const deleteProduct = catchAsync(async (req, res) => {
    await ProductServices.deleteProductFromDB(
        req.user as JwtPayload,
        req.params.id,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Product deleted successfully`,
        data: undefined,
    });
});

const getSpecificSellerProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.getSpecificSellerProductFromDB(
        req.params.sellerId,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Seller's products retrieved successfully`,
        data: result,
    });
});
const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products retrieved successfully`,
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    updateProduct,
    deleteProduct,
    getSpecificSellerProduct,
    getAllProducts,
};
