import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CartValidations } from "./cart.validation";
import { CartControllers } from "./cart.controller";

const router = Router();

router.post(
    `/add-to-cart`,
    auth(),
    validateRequest(CartValidations.createCartValidationSchema),
    CartControllers.addProductToCart,
);

router.delete(
    `/delete-from-cart`,
    auth(),
    CartControllers.deleteProductFromCart,
);

router.get(
    `/get-products-from-cart`,
    auth(),
    CartControllers.getProductsInCartByUser,
);

export const CartRouter = router;
