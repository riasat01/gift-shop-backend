import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { WishlistValidations } from "./wishlist.validation";
import { WishlistController } from "./wishlist.controller";

const router = Router();

router.post(
    `/add-to-wishlist`,
    auth(),
    validateRequest(WishlistValidations.createWishlistValidationSchema),
    WishlistController.addProductToWishlist,
);

router.delete(
    `/delete-from-wishlist`,
    auth(),
    WishlistController.deleteProductFromWishlist,
);

router.get(
    `/get-products-from-wishlist`,
    auth(),
    WishlistController.getProductsInWishlistByUser,
);

export const WishlistRouter = router;
