import User from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const fetchUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const createUser = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new User({
            display_id: uuidv4(),
            email: email,
            fullname: fullname,
            password: hashedPassword
        })
        const response = await newUser.save()
        jwt.sign({
            "_id": response._id,
            "fullname": response.fullname,
            "email": response.email,
            "role": response.role
        },
            process.env.JWT_SECRET,
            {},
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Something went wrong" });
                }
                return res.cookie('user', token).json({ message: "Signup successful" })
            })
    } catch (err) {
        return res.status(400).json({ err: err, message: "User Not Created" })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const check = await User.findOne({ email: email });
    if (!check) {
        return res.status(400).json({ apiErrorMessage: "User not found" });
    }
    const pass = bcrypt.compareSync(password, check.password);
    if (!pass) {
        return res.status(400).json({ apiErrorMessage: "Wrong Credentials" });
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
                return res.status(500).json({ apiErrorMessage: "Something went wrong" });
            }
            return res.status(201).cookie('user', token).json({ apiSuccessMessage: "Login successful" });
        })
}

export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updateOptions = {};
        if (req.body.address && !req.body.address._id) {
            updateOptions.$addToSet = { addresses: req.body.address };
        }
        if (req.body.fullname) {
            updateOptions.fullname = req.body.fullname;
        }
        const updatable = await User.findOneAndUpdate({ _id: user_id }, updateOptions, { new: false })
        return res.status(201).json({ updatable });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const updateUserAddress = async (req, res) => {
    try {
        const { type, address } = req.body;
        const { _id: user_id } = req.user;
        switch (type) {
            case 'add': {
                const updatable = await User.findOneAndUpdate({ _id: user_id }, { $push: { addresses: address } }, { new: true });
                if (updatable) {
                    return res.status(201).json({ apiSuccessMessage: "Address added" });
                } else {
                    return res.status(400).json({ apiErrorMessage: "Address couldn't be added." });
                }
                break;
            }
            case 'update': {
                const addressId = address._id;
                delete address["_id"];
                const updatable = await User.findOneAndUpdate({ _id: user_id, addresses: { $elemMatch: { _id: addressId } } }, { "addresses.$": address }, { new: true });
                if (updatable) {
                    return res.status(201).json({ apiSuccessMessage: "Address updated" });
                } else {
                    return res.status(400).json({ apiErrorMessage: "Address couldn't be updated." });
                }
                break;
            }
            case 'delete': {
                const deletable = await User.findOneAndUpdate({ _id: user_id, addresses: { $elemMatch: { _id: address._id } } }, { $pull: { addresses: address } });
                if (deletable) {
                    return res.status(201).json({ apiSuccessMessage: "Address deleted" });
                } else {
                    return res.status(400).json({ apiErrorMessage: "Address couldn't be deleted." });
                }
            }
            default:
                return res.status(400).json({ apiErrorMessage: "User not found" });
                break;
        }
    } catch (err) {
        return res.status(500).json({ apiErrorMessage: "Something went wrong", err });
    }
}


export const checkAuth = (req, res) => {
    const { user } = req;
    if (!user) {
        res.sendStatus(400); // unreachable due to middleware
    }
    res.status(200).json(user);
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


}
export const resetPassword = async (req, res) => {
    // check token and reset password


}