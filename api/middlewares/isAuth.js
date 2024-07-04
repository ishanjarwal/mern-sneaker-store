import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    const { user } = req.cookies;
    if (!user) {
        return res.status(400).json({ status: "fail", message: "login to continue" })
    }
    // verify inside jwt
    const decoded = jwt.verify(user, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
        return res.status(400).json({ status: "fail", message: "invalid user" })
    }
    const check = await User.findById(decoded._id);
    if (!check) {
        return res.status(400).json({ status: "fail", message: "invalid user" })
    }
    req.user = check;
    next();
}
