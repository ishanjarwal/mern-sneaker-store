import mongoose from "mongoose";
import Product from "../models/productModel.js"

export const validateProductDB = async (req, res, next) => {
    const { product_id = req.params.product_id } = req.body
    if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
        return res.status(400).json({ status: "fail", message: "Invalid Product ID" })
    }
    const check = await Product.findById(product_id);
    if (!check) {
        return res.status(400).json({ status: "fail", message: "Invalid Product ID" })
    } else {
        next();
    }
}
