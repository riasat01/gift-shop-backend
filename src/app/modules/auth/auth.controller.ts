import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUserService(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `Login successful`,
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
};
