import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { UserRouter } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: `/authentication`,
        route: AuthRouter,
    },
    {
        path: `/users`,
        route: UserRouter,
    },
];

moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;
