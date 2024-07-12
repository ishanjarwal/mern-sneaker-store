import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const validateQtyDB = async (req, res, next, { product_id, size, qty }) => {
    const check = await Product.findOne({
        _id: product_id,
        sizes: { $elemMatch: { _id: size, stock: { $gte: qty } } }
    },
        { "sizes.$": 1 }
    );
    if (!check) {
        return res.status(400).json({ status: "fail", message: "quantity requested cannot be fulfilled" })
    }
    next();
}
