import { check } from "express-validator";
import Product from "../models/productModel.js";
import { available_payment_methods } from '../constants/constants.js'
import User from "../models/userModel.js";
import mongoose from "mongoose";

const validateOrder = [
    check('payment_method')
        .notEmpty().withMessage("Please provide an a payment method").bail()
        .isString().withMessage("Invalid payment method").bail()
        .custom((value) => {
            if (!available_payment_methods.includes(value)) {
                throw new Error("Invalid Payment method");
            }
            return true;
        }),
    check('address')
        .notEmpty().withMessage("Please provide an Address").bail()
        .isString().withMessage("Invalid Address").bail()
        .custom(async (value, { req }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(value.toString())) {
                    throw new Error("Invalid Address")
                }
                const found = await User.findOne({ _id: req.user._id, addresses: { $elemMatch: { _id: value } } });
                if (!found) {
                    throw new Error("Invalid Address")
                }
                return true;
            } catch (e) {
                throw new Error(e.message)
            }
        }),
    check('items')
        .isArray({ min: 1 }).withMessage('Items must have at least one item')
        .custom(async (items) => {
            try {
                for (const item of items) {
                    if (!item?.id || !item?.size || !item?.quantity || !mongoose.Types.ObjectId.isValid(item?.id) || !mongoose.Types.ObjectId.isValid(item?.size) || typeof (item?.quantity) !== 'number') {
                        throw new Error("Invalid Data");
                    }
                    const found = await Product.findOne({
                        _id: item.id,
                        sizes: {
                            $elemMatch: {
                                _id: item.size,
                                stock: { $gte: item.quantity }
                            }
                        }
                    });
                    if (!found) {
                        throw new Error("Invalid Item");
                    }
                }
            } catch (e) {
                throw new Error(e.message)
            }
            return true;
        }),
];

export default validateOrder