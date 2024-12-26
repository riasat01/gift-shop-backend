import Product from "../product/product.model";
import { ICartProduct } from "./cart.interface";

export const calculateTotalPrice = async (
    products: Partial<ICartProduct>[],
) => {
    let totalPrice = 0;
    for (const { product, quantity } of products) {
        const productData = await Product.findById(product);
        if (productData) {
            totalPrice += productData.price * (quantity as number);
        }
    }
    return totalPrice;
};
