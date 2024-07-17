import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import generateRandomString from '../utils/randomString.js'
import { sendEmails } from "../utils/sendEmails.js";

export const fetchUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        res.status(200).json({ status: "success", message: "user fetched", data: user });
    } catch (err) {
        res.status(500).json({ status: "error", message: "an error occurred, user not fetched", err: err });
    }
}

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find().populate({
            path: 'cart',
            populate: {
                path: 'items.product_id',
                model: 'Product'
            }
        }).populate({
            path: 'wishlist',
            populate: {
                path: 'items.product_id',
                model: 'Product'
            }
        }).exec();
        const sendable = users.map(el => ({
            email: el.email,
            fullname: el.fullname,
            addresses: el.addresses,
            cart: el.cart.items.map(product => ({
                name: product.product_id.name,
                img: product.product_id.images[0],
                size: product.product_id.sizes.find(el => el._id.toString() === product.size.toString()),
                qty: product.qty,
                id: product.product_id._id
            })),
            wishlist: el.wishlist.items.map(product => ({
                name: product.product_id.name,
                img: product.product_id.images[0],
                id: product.product_id._id
            })),
            createdAt: el.createdAt,
            updatedAt: el.updatedAt
        }))
        return res.status(200).json({ status: "success", data: sendable });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err });
    }
}


export const createUser = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({ status: "fail", message: "user already exists" })
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new User({
            display_id: uuidv4(),
            email: email,
            fullname: fullname,
            password: hashedPassword,
        })
        const response = await newUser.save()
        jwt.sign({
            "_id": response._id,
            "fullname": response.fullname,
            "email": response.email,
            "role": response.role,
        },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) {
                    return res.status(500).json({ status: "error", message: "something went wrong", err });
                }
                return res.cookie('user', token).json({ status: "success", message: "user registered" })
            })
    } catch (err) {
        return res.status(400).json({ status: "error", message: "an error occurred, user not registered", err })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const check = await User.findOne({ email: email });
    if (!check) {
        return res.status(400).json({ status: "fail", message: "username or password is wrong" });
    }
    const pass = bcrypt.compareSync(password, check.password);
    if (!pass) {
        return res.status(400).json({ status: "fail", message: "username or password is wrong" });
    }
    jwt.sign({
        "_id": check._id,
        "fullname": check.fullname,
        "email": check.email,
        "role": check.role
    },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "something went wrong", err });
            }
            return res.status(201).cookie('user', token).json({ status: "success", message: "user logged in successfully", data: check });
        })
}

export const logoutUser = async (req, res) => {
    try {
        await res.clearCookie('user').status(200).json({ status: "success", message: "user logged out" })
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}


export const updateUser = async (req, res) => {
    try {
        const { _id: user_id } = req.user;
        const { fname, lname, email } = req.body
        const updateOptions = {
            fullname: fname + " " + lname,
            email: email
        }
        const updatable = await User.findOneAndUpdate({ _id: user_id }, updateOptions, { new: false })
        return res.status(201).json({ status: "success", message: "user updated" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "error occurred, user not updated", err });
    }
}

export const deleteUserAddress = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const user_id = user._id;
        const deletable = await User.findOneAndUpdate(
            { _id: user_id },
            { $pull: { addresses: { _id: id } } }
        );
        return res.status(201).json({ status: "success", message: "address deleted" });
    } catch (err) {
        return res.status(400).json({ status: "fail", message: "an error occurred, address not deleted", err });
    }
}


export const updateUserAddress = async (req, res) => {
    try {
        const { type, address } = req.body;
        const { user } = req;
        const user_id = user._id;
        switch (type) {
            case 'add': {
                const updatable = await User.findOneAndUpdate({ _id: user_id }, { $push: { addresses: { ...address, country: address.country.name, state: address.state.name, city: address.city.name } } }, { new: true });
                return res.status(201).json({ status: "success", message: "address added" });
                break;
            }
            case 'update': {
                const addressId = address._id;
                delete address["_id"];
                const updatable = await User.findOneAndUpdate({ _id: user_id, addresses: { $elemMatch: { _id: addressId } } }, { "addresses.$": { ...address, country: address.country.name, state: address.state.name, city: address.city.name } }, { new: true });
                return res.status(201).json({ status: "success", message: "address updated" });
                break;
            }
            default:
                return res.status(400).json({ status: "fail", message: "insufficient data provided" });
                break;
        }
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err });
    }
}


export const checkAuth = (req, res) => {
    const { user } = req;
    if (!user) {
        res.sendStatus(400); // unreachable due to middleware
    }
    res.status(200).json({ status: "success", message: "user authenticated", data: user });
}

export const checkAdmin = (req, res) => {
    const { user } = req;
    if (!user) {
        res.status(500).end(); // unreachable due to middleware
    }
    res.status(200).end()
}

export const sendResetPasswordToken = async (req, res) => {
    // send mail with token link and add token to db
    try {
        const { user } = req;
        const now = new Date();
        const emailToken = generateRandomString(16);
        const expiry = new Date(now.getTime() + (10 * 60000));
        const link = `http://localhost:5173/reset-password/${emailToken}`;
        const editable = await User.findById(user._id);
        if (!editable) {
            return res.status(400).json({ status: "fail", message: "no user found" });
        }
        editable.passwordResetToken.token = emailToken;
        editable.passwordResetToken.expiry = expiry;
        await editable.save();
        sendEmails("123@example.com", `<a href="${link}">RESET PASSWORD</a>`, "Rest Account Password");
        return res.status(200).json({ status: "success", message: "Reset link sent to registered email" });

    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err });
    }
}
export const resetPassword = async (req, res) => {
    // check token and reset password
    try {
        const { user } = req;
        const { password } = req.body;
        const { token } = req.params;
        if (!token || !password) {
            return res.status(400).json({ status: "fail", message: "invalid token" });
        }
        const now = new Date();
        // const check = await User.findById(user._id);
        const check = await User.findOne({ _id: user._id, "passwordResetToken.token": token, "passwordResetToken.expiry": { $gt: now } })
        if (!check) {
            return res.status(400).json({ status: "fail", message: "token expired" });
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        check.password = hashedPassword;
        await check.save();
        return res.status(200).json({ status: "success", message: "password updated successfully" });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err });
    }
}