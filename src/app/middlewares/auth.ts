import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import CustomError from "../error/CustomError";
import httpStatus from "http-status";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user.model";

const auth = () => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                throw new CustomError(
                    httpStatus.UNAUTHORIZED,
                    `You are not authorized`,
                    `auth`,
                );
            }
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
            const user = await User.findOne(decoded.email);
            if (!user) {
                throw new CustomError(
                    httpStatus.UNAUTHORIZED,
                    `You are not authorized`,
                    `auth`,
                );
            }
            req.user = decoded;
            next();
        },
    );
};

export default auth;
