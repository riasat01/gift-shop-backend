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
    ProductControllers.createproduct,
);

export const ProductRouter = router;
