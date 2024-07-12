import Cart from "../models/cartModel.js";
import { v4 as uuidv4 } from 'uuid'
import Product from "../models/productModel.js";


export const fetchCart = async (req, res) => {
    try {
        const { user } = req;
        const user_id = user._id;
        const userCart = await Cart.findOne({ user_id: user_id })
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

        if (!userCart) {
            // create cart
            const newCart = new Cart({
                display_id: uuidv4(),
                user_id: user_id,
                items: []
            })
            const result = await newCart.save()
            res.status(201).json({ status: "success", data: result })
        } else {
            const sendable = userCart.items.map(item => {
                const currSize = item.product_id.sizes.find(el => el._id.toString() == item.size);
                return (
                    {
                        id: item._id,
                        qty: item.qty,
                        size: currSize,
                        product: {
                            _id: item.product_id._id,
                            name: item.product_id.name,
                            thumbnail: item.product_id.images[0],
                            sizes: item.product_id.sizes,
                            mrp: currSize.price,
                            discountPercentage: currSize.discountPercentage,
                            sp: currSize.price * (1 - (currSize.discountPercentage / 100)),
                            stock: currSize.stock
                        },
                        availableStock: (currSize.stock - item.qty)
                    }
                )
            })
            res.status(201).json({ status: "success", data: sendable })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}


export const addToCart = async (req, res) => {
    try {
        const { user } = req;
        const user_id = user._id
        const { product_id, size, qty } = req.body;

        const checkCart = await Cart.findOne({ user_id: user_id });
        if (!checkCart) {
            return res.status(400).json({ status: "fail", message: "cart not found" })
        }

        const requestedProduct = await Product.findOne({
            _id: product_id,
            "sizes._id": size
        },
            { "sizes.$": 1 }
        )
        const availableStock = requestedProduct.sizes[0].stock;

        const checkDuplicateItem = await Cart.findOne(
            {
                user_id: user_id,
                items: {
                    $elemMatch: { product_id: product_id, size: size }
                }
            }
        )
        if (checkDuplicateItem) {
            const existingStock = checkDuplicateItem.items[0].qty;
            if ((qty + existingStock) <= availableStock) {
                const update = await Cart.findOneAndUpdate({
                    user_id: user_id,
                    items: { $elemMatch: { product_id: product_id, size: size } }
                },
                    {
                        $inc: { "items.$.qty": qty },
                    }
                )
                return res.status(201).json({ status: "success", message: "product added to cart" })
            } else {
                return res.status(400).json({ status: "fail", message: "requested quantity cannot be fulfilled" })
            }
        }
        else {
            const updatable = await Cart.findOneAndUpdate(
                { user_id: user_id },
                { $push: { items: { product_id, size, qty } } },
                { new: false }
            )
            return res.status(201).json({ status: "success", message: "product added to cart" })
        }

    }
    catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err })
    }

}

export const deleteFromCart = async (req, res) => {
    try {
        const { item_id } = req.params;
        const { user } = req;
        const user_id = user._id;
        const checkCart = await Cart.findOne({
            user_id: user_id,
            items: { $elemMatch: { _id: item_id } }
        });
        if (!checkCart) {
            return res.status(400).json({ status: "fail", message: "no such item in cart" })
        }
        const deletable = await Cart.findOneAndUpdate({ user_id: user_id }, { $pull: { items: { _id: item_id } } }, { new: false })
        return res.status(201).json({ status: "success", message: "product deleted from cart" })
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}

export const updateCart = async (req, res) => {
    try {
        const { user } = req;
        const user_id = user._id;
        const { item_id } = req.params;
        const { product_id, size, qty } = req.body;


        // check if the product is already in cart with same product_id, same size but different item_id
        const checkCart = await Cart.findOne(
            {
                user_id: user_id,
                items: { $elemMatch: { product_id, size, _id: { $ne: item_id } } }
            },
            { "items.$": 1 }
        )
        const requestedProduct = await Product.findOne({
            _id: product_id,
            "sizes._id": size
        },
            { "sizes.$": 1 }
        )
        const availableStock = requestedProduct.sizes[0].stock;
        if (!checkCart) {  // same product doesn't exist in cart
            if (qty <= availableStock) {
                const update = await Cart.findOneAndUpdate(
                    {
                        user_id: user_id,
                        "items._id": item_id
                    },
                    {
                        $set: { "items.$.qty": qty, "items.$.size": size }
                    }
                )
            } else {
                const update = await Cart.findOneAndUpdate(
                    {
                        user_id: user_id,
                        "items._id": item_id
                    },
                    {
                        $set: { "items.$.qty": availableStock, "items.$.size": size }
                    }
                )
            }
            return res.status(200).json({ status: "success", message: "cart updated" })
        } else {
            // if a product with same size and product_id but different item_id already exists
            const existingStock = checkCart.items[0].qty;
            if ((qty + existingStock) <= availableStock) {
                const updated = await Cart.findOneAndUpdate(
                    {
                        user_id: user_id,
                        items: { $elemMatch: { product_id, size, _id: { $ne: item_id } } }
                    },
                    {
                        $set: { "items.$.size": size },
                        $inc: { "items.$.qty": qty },
                    }
                )
            } else {
                const updated = await Cart.findOneAndUpdate(
                    {
                        user_id: user_id,
                        items: { $elemMatch: { product_id, size, _id: { $ne: item_id } } }
                    },
                    {
                        $set: { "items.$.size": size, "items.$.qty": availableStock },
                    }
                )
            }
            const pullItem = await Cart.findOneAndUpdate(
                {
                    user_id: user_id,
                },
                {
                    $pull: { items: { _id: item_id } }
                }
            );
            return res.status(200).json({ status: "success", message: "cart updated" })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: "something went wrong", err })
    }
}


export const filterCart = async (req, res) => {
    //  remove the out of stock items, this api will be hit at checkout page.
    try {
        const { user } = req;
        const cart = await Cart.findOne({ user_id: user._id })
            .populate({
                path: 'items',
                populate: {
                    path: 'product_id',
                    model: 'Product'
                }
            });
        if (!cart) {
            return res.status(400).json({ status: "fail", message: "cart not found" });
        }
        let lowStockItemsIds = [];
        lowStockItemsIds = cart.items.filter(item => {
            const size = item.product_id.sizes.find(size => size._id.toString() == item.size.toString())
            return size.stock < 1;
        }).map(item => item._id);
        if (lowStockItemsIds.length > 0) {
            const updated = await Cart.findOneAndUpdate(
                { user_id: user._id },
                { $pull: { items: { _id: { $in: lowStockItemsIds } } } },
            );
            return res.status(200).json({ status: "success", message: "removed out of stock items from cart" });
        } else {
            return res.status(200).json({ status: "success", message: "ready for checkout" });
        }
    } catch (err) {
        return res.status(500).json({ status: "error", message: "something went wrong", err });
    }
}
