import jwt from "jsonwebtoken";

interface IJwtPayload {
    email: string;
}

export const createToken = (
    jwtPayload: IJwtPayload,
    secret: string,
    //   expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn: "10d",
    });
};
