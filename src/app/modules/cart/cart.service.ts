import { JwtPayload } from "jsonwebtoken";
import CustomError from "../../error/CustomError";
import httpStatus from "http-status";
import Cart from "./cart.model";
import { startSession } from "mongoose";
import { calculateTotalPrice } from "./cart.utils";
import { ICart, ICartProduct } from "./cart.interface";

const addProductToCartIntoDB = async (
    products: Partial<ICartProduct>[],
    user: JwtPayload,
) => {
    if (!user) {
        throw new CustomError(
            httpStatus.BAD_REQUEST,
            `Could not find the user`,
            `addProductToCartIntoDB`,
        );
    }

    const session = await startSession();
    session.startTransaction();

    try {
        const cart = await Cart.findOne({ user: user._id }, null, { session });
        if (!cart) {
            const totalPrice = await calculateTotalPrice(products);
            const newCart = await Cart.create(
                [
                    {
                        user: user._id,
                        products: products.map(({ product, quantity }) => ({
                            product,
                            quantity,
                        })),
                        totalPrice,
                    },
                ],
                { session },
            );
            await session.commitTransaction();
            return newCart;
        } else {
            await Cart.updateOne(
                { user: user._id },
                {
                    $push: {
                        products: {
                            $each: products.map(({ product, quantity }) => ({
                                product,
                                quantity,
                            })),
                        },
                    },
                },
                { session },
            );

            const updatedCart = await Cart.findOne({ user: user._id }, null, {
                session,
            });
            const totalPrice = await calculateTotalPrice(
                (updatedCart as ICart).products,
            );
            await Cart.updateOne(
                { user: user._id },
                { $set: { totalPrice } },
                { session },
            );

            await session.commitTransaction();
            return await Cart.findOne({ user: user._id }, null, { session });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction();
        throw new CustomError(
            httpStatus.INTERNAL_SERVER_ERROR,
            `Error adding product to cart: ${error.message}`,
            `addProductToCartIntoDB`,
        );
    } finally {
        session.endSession();
    }
};

export const CartServices = {
    addProductToCartIntoDB,
};
