import { check } from "express-validator";
import Product from "../models/productModel.js";
import { available_payment_methods } from '../constants/constants.js'
import User from "../models/userModel.js";
import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

const validateCartItem = [
    check('product_id')
        .notEmpty().withMessage("please provide an a product to add").bail({ level: 'request' })
        .custom(async (value) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("invalid product");
                }
                const found = await Product.findById(value);
                if (!found) {
                    throw new Error("invalid product");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
    check('size')
        .notEmpty().withMessage("please provide a size").bail({ level: 'request' })
        .custom(async (value, { req }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("invalid size");
                }
                const found = await Product.findOne({
                    _id: req.body?.product_id,
                    sizes: { $elemMatch: { _id: value } }
                });
                if (!found) {
                    throw new Error("invalid product");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
    check('qty')
        .toInt().isNumeric().isInt().withMessage('please provide a valid quantity').bail({ level: 'request' })
        .custom(async (value, { req }) => {
            try {
                if (value <= 0) {
                    throw new Error("quantity cannot be zero or less")
                }
                const found = await Product.findOne({
                    _id: req.body?.product_id,
                    sizes: { $elemMatch: { _id: req.body?.size, stock: { $gte: value } } }
                });
                if (!found) {
                    throw new Error("quantity cannot be fulfilled");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
];

const validateCartItemById = [
    check('item_id')
        .notEmpty().withMessage("please provide a cart item").bail({ level: 'request' })
        .custom(async (value, { req }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    throw new Error("invalid cart item id");
                }
                const found = await Cart.findOne({
                    user_id: req.user._id,
                    items: { $elemMatch: { _id: value } }
                });
                if (!found) {
                    throw new Error("invalid cart item");
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }).bail({ level: 'request' }),
]

export { validateCartItem, validateCartItemById }