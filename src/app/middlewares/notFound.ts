import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: `API not found`,
    });
};

export default notFound;
