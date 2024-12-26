import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { UserRouter } from "../modules/user/user.route";
import { ProductRouter } from "../modules/product/product.route";
import { WishlistRouter } from "../modules/wishlist/wishlist.route";
import { CartRouter } from "../modules/cart/cart.route";

const router = Router();

const moduleRoutes = [
    {
        path: `/authentications`,
        route: AuthRouter,
    },
    {
        path: `/users`,
        route: UserRouter,
    },
    {
        path: `/products`,
        route: ProductRouter,
    },
    {
        path: `/wishlists`,
        route: WishlistRouter,
    },
    {
        path: `/carts`,
        route: CartRouter,
    },
];

moduleRoutes?.forEach((route) => router.use(route?.path, route?.route));

export default router;
