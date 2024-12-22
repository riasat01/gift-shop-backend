import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

const main = async () => {
    try {
        await mongoose.connect(config?.db_url as string);
        server = app.listen(config?.port, () => {
            console.log(`server is running properly at port ${config?.port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
process.on("unhandledRejection", () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    process.exit(1);
});
