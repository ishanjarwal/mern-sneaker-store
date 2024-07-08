import Cart from "../models/cartModel.js";
import { v4 as uuidv4 } from 'uuid'
import Wishlist from "../models/wishlistModel.js";


export const fetchWishlist = async (req, res) => {
    try {
        const { user_id } = req.params
        const userWishlist = await Wishlist.findOne({ user_id: user_id })
            .populate({
                path: 'items',
                populate: {
                    path: 'product_id',
                    model: 'Product'
                }
            })
            .populate({
                path: 'items.product_id',
                populate: {
                    path: 'brand',
                    model: 'Brand'
                }
            })
            .populate({
                path: 'items.product_id',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            })

        if (!userWishlist) {
            // create cart
            const newWishlist = new Wishlist({
                display_id: uuidv4(),
                user_id: user_id,
                items: []
            })
            const result = await newWishlist.save()
            return res.status(201).json({ status: "success", data: result })
        } else {
            const sendable = userWishlist.items.map(item => {
                const currSize = item.product_id.sizes[0];
                return (
                    {
                        _id: item.product_id._id,
                        name: item.product_id.name,
                        brand: item.product_id.brand.name,
                        thumbnail: item.product_id.images[0],
                        sizes: item.product_id.sizes,
                        mrp: currSize.price,
                        discountPercentage: currSize.discountPercentage,
                        sp: currSize.price * (1 - (currSize.discountPercentage / 100)),
                        stock: currSize.stock
                    }
                )
            })
            return res.status(200).json({ status: "success", data: sendable })
        }
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}


export const addToWishlist = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { product_id } = req.body;

        const checkWishlist = await Wishlist.findOne({ user_id: user_id });
        if (!checkWishlist) {
            return res.status(400).json({ status: "fail", message: "couldn't find wishlist" })
        }
        const checkDuplicateItem = await Wishlist.findOne({ user_id: user_id, items: { $elemMatch: { product_id: product_id } } })
        if (checkDuplicateItem) {
            return res.status(200).json({ status: "success", message: "product already in your wishlist" })
        } else {
            const updatable = await Wishlist.findOneAndUpdate({ user_id: user_id }, { $push: { items: { product_id } } }, { new: false })
            return res.status(201).json({ status: "success", message: "product added to wishlist" })
        }
    }
    catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err })
    }

}

export const deleteFromWishlist = async (req, res) => {
    try {
        const { user_id, product_id } = req.params;
        const checkWishlist = await Wishlist.findOne({
            user_id: user_id,
            items: { $elemMatch: { product_id } }
        });
        if (!checkWishlist) {
            return res.status(400).json({ status: "fail", message: "product not in your wishlist" })
        }
        const deletable = await Wishlist.findOneAndUpdate({ user_id: user_id }, { $pull: { items: { product_id } } }, { new: false })
        res.status(201).json({ status: "success", message: "item removed from wishlist" })
    } catch (err) {
        res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}
