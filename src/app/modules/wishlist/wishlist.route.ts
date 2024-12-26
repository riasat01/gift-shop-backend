import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { WishlistValidations } from "./wishlist.validation";
import { WishlistControllers } from "./wishlist.controller";

const router = Router();

router.post(
    `/add-to-wishlist`,
    auth(),
    validateRequest(WishlistValidations.createWishlistValidationSchema),
    WishlistControllers.addProductToWishlist,
);

router.delete(
    `/delete-from-wishlist`,
    auth(),
    WishlistControllers.deleteProductFromWishlist,
);

router.get(
    `/get-products-from-wishlist`,
    auth(),
    WishlistControllers.getProductsInWishlistByUser,
);

export const WishlistRouter = router;
