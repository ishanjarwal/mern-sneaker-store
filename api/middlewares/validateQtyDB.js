import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const validateSizeDB = async (req, res, next, size) => {
    const { qty } = req.body
    if (!qty) {
        return res.status(400).json({ errMessage: "Invalid Quantity" })
    }
    const check = await Product.findOne({
        $and: [
            { _id: product_id },
            { sizes: { $elemMatch: { _id: size } } }
        ]
    });
    if (!check) {
        return res.status(400).json({ errMessage: "Invalid Product or Size ID" })
    }
    next();
}
