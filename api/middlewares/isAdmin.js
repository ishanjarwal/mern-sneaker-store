import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const isAdmin = async (req, res, next) => {
    const { user } = req.cookies;
    if (!user) {
        return res.status(400).json({ status: "fail", message: "Login to continue" })
    }
    // verify inside jwt
    const decoded = jwt.verify(user, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
        return res.status(400).json({ status: "fail", message: "Invalid Token" })
    }
    const check = await User.findOne({ _id: decoded._id })
    if (!check || !check.role) {
        return res.status(400).json({ status: "fail", message: "Invalid Token" })
    }
    if (check.role !== 'admin') {
        return res.status(400).json({ status: "fail", message: "Unathorized" })
    }
    next();
}
