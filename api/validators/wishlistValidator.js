import mongoose from "mongoose";
import Wishlist from "../models/wishlistModel.js";
import { check } from "express-validator";
import Product from "../models/productModel.js";

const validateWishlistItemById = [
    check('item_id')
        .notEmpty().withMessage("please provide a wishlist item").bail({ level: 'request' })
        .custom(async (value, { req }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("invalid wishlist item id");
                }
                const found = await Wishlist.findOne({
                    user_id: req.user._id,
                    items: { $elemMatch: { _id: value } }
                });
                if (!found) {
                    throw new Error("invalid wishlist item");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
]

const validateWishlistItem = [
    check('product_id')
        .notEmpty().withMessage("please provide a product to add").bail({ level: 'request' })
        .custom(async (value, { req }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("invalid product id");
                }
                const found = await Product.findById(value);
                if (!found) {
                    throw new Error("invalid product item");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
]

export { validateWishlistItemById, validateWishlistItem }