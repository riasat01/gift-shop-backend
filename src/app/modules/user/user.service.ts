import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./use.interface";
import User from "./user.model";
import CustomError from "../../error/CustomError";
import httpStatus from "http-status";

const createUserIntoDB = async (payload: IUser) => {
    const newUser = await User.create(payload);
    return newUser;
};

const updateUserRoleIntoDB = async (
    id: string,
    payload: Partial<IUser>,
    user: JwtPayload,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.UNAUTHORIZED,
            `Unauthorized to perform the operation`,
            `updateUserRoleIntoDb`,
        );
    }

    if (user.role !== `Admin`) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `User is forbidden to perform the operation`,
            `updateUserRoleIntoDb`,
        );
    }
    const { role } = payload;
    if (!role) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `couldn't find user role`,
            `updateUserRoleIntoDb`,
        );
    }
    const result = await User.findByIdAndUpdate(id, { role });
    return result;
};

const deleteUserFromDB = async (id: string, user: JwtPayload) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Unauthorized to perform the operation`,
            `updateUserRoleIntoDb`,
        );
    }

    if (user.role !== `Admin`) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `User is forbidden to perform the operation`,
            `updateUserRoleIntoDb`,
        );
    }
    const result = await User.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};

const getAllUsersFromDB = async (user: JwtPayload) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Unauthorized to perform the operation`,
            `getAllUsersFromDB`,
        );
    }

    if (user.role !== `Admin`) {
        throw new CustomError(
            httpStatus.FORBIDDEN,
            `User is forbidden to perform the operation`,
            `getAllUsersFromDB`,
        );
    }
    const result = await User.find();
    return result;
};

export const UserServices = {
    createUserIntoDB,
    updateUserRoleIntoDB,
    deleteUserFromDB,
    getAllUsersFromDB,
};
