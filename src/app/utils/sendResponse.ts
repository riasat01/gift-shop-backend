import { Response } from "express";

interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
}

const sendResponse = <T>(res: Response, dataPayload: IResponse<T>) => {
    const { statusCode, success, message, data } = dataPayload;
    res.status(statusCode).json({
        success,
        message,
        statusCode,
        data,
    });
};

export default sendResponse;
