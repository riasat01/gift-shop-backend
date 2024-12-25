import config from "../../config";
import CustomError from "../../error/CustomError";
import User from "../user/user.model";
import { createToken } from "./auth.utils";
import httpStatus from "http-status";

const loginUserService = async (payload: {
    email: string;
    firebaseUID: string;
}) => {
    const user = await User.findOne({
        email: payload.email,
        firebaseUID: payload.firebaseUID,
    });
    if (!user) {
        throw new CustomError(
            httpStatus.NOT_FOUND,
            `Couldn't find the user`,
            `loginUserService`,
        );
    }
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
    );
    return {
        token: `Bearer ${accessToken}`,
    };
};

export const AuthServices = {
    loginUserService,
};
