import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
    const response = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `User created successfully`,
        data: response,
    });
});

const updateUser = catchAsync(async (req, res) => {
    const response = await UserServices.updateUserRoleIntoDB(
        req.params.id,
        req.body,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User updated successfully`,
        data: response,
    });
});

const deleteUser = catchAsync(async (req, res) => {
    await UserServices.deleteUserFromDB(req.params.id, req.user as JwtPayload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User deleted successfully`,
        data: undefined,
    });
});

const getallUsers = catchAsync(async (req, res) => {
    const response = await UserServices.getAllUsersFromDB(req.user as JwtPayload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User deleted successfully`,
        data: response,
    });
});

export const UserControllers = {
    createUser,
    updateUser,
    deleteUser,
    getallUsers,
};
