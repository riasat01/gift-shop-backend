import express from "express";
import cors from "cors";
import router from "./app/route";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import httpStatus from "http-status";
import sendResponse from "./app/utils/sendResponse";

const app = express();

app.use(cors());
app.use(express.json());

app.use(`/api`, router);
app.get(`/`, async (req, res) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Server is responding`,
        data: undefined
    });
});

// app.use(globalErrorHandler);
app.use(notFound);

export default app;
