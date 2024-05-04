import mongoose from "mongoose";
import User from "../models/userModel.js"

export const validateUserDB = async (req, res, next) => {
    const { user_id } = req.params;
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ errMessage: "Invalid User ID" })
    }
    const user = await User.findById(user_id);
    if (!user) {
        return res.status(400).json({ errMessage: "Invalid User ID" })
    }
    req.user = user;
    next();
}
