import config from "../../config";
import { createToken } from "./auth.utils";

const loginUserService = async (payload: string) => {
    const jwtPayload = {
        email: payload,
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
