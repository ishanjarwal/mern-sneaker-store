import mongoose from "mongoose";
import Cart from "../models/cartModel.js";

export const validateCartItem = async (req, res, next, item_id) => {
    const { user } = req;
    const user_id = user._id;
    if (!item_id || !mongoose.Types.ObjectId.isValid(item_id)) {
        return res.status(400).json({ status: "fail", message: "invalid cart item" })
    }
    const check = await Cart.findOne({
        user_id: user_id,
        items: { $elemMatch: { _id: item_id } }
    });
    if (!check) {
        return res.status(400).json({ status: "fail", message: "wrong cart item" })
    }
    next();
}
