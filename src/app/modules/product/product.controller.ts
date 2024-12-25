import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createproduct = catchAsync(async (req, res) => {
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

export const ProductControllers = {
    createproduct,
};
