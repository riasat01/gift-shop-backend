import Product from "../product/product.model";
import { ICartProduct } from "./cart.interface";

export const calculateTotalPrice = async (
    products: Partial<ICartProduct>[],
) => {
    let totalPrice = 0;
    for (const { product, quantity, isDeleted } of products) {
        if (!product || !quantity || isDeleted) {
            continue;
        }

        const productData = await Product.findById(product);
        if (productData) {
            totalPrice += productData.price * quantity;
        }
    }
    return totalPrice;
};
