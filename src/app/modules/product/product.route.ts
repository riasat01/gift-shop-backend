import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidations } from "./product.validation";
import { ProductControllers } from "./product.controller";

const router = Router();

router.post(
    `/create-product`,
    auth(),
    validateRequest(ProductValidations.createProductSchema),
    ProductControllers.createProduct,
);
router.patch(
    `/update-product/:id`,
    auth(),
    validateRequest(ProductValidations.updateProductSchema),
    ProductControllers.createProduct,
);
router.delete(`/delete-product/:id`, auth(), ProductControllers.createProduct);
router.get(
    `/seller-products/:sellerId`,
    auth(),
    ProductControllers.createProduct,
);
router.get(`/`, ProductControllers.createProduct);

export const ProductRouter = router;
