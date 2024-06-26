import Cart from "../models/cartModel.js";
import { v4 as uuidv4 } from 'uuid'


export const fetchCart = async (req, res) => {
    try {
        const { user_id } = req.params
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
            return res.status(201).json(result)
        } else {
            const sendable = userCart.items.map(item => {
                const currSize = item.product_id.sizes.find(el => el._id.toString() == item.size);
                return (
                    {
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
                        }
                    }
                )
            })
            return res.status(200).json(sendable)
        }
    } catch (err) {
        return res.status(500).json({ err: err, apiErrorMessage: "Couldn't fetch cart" })
    }
}


export const addToCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { product_id, size, qty } = req.body;

        const checkCart = await Cart.findOne({ user_id: user_id });
        if (!checkCart) {
            return res.status(400).json({ apiErrorMessage: "Cart not found" })
        }
        const checkDuplicateItem = await Cart.findOne({ user_id: user_id, items: { $elemMatch: { product_id: product_id, size: size } } })
        if (checkDuplicateItem) {
            const update = await Cart.findOneAndUpdate({
                user_id: user_id,
                items: { $elemMatch: { product_id: product_id, size: size } }
            },
                {
                    $inc: { "items.$.qty": qty },
                }
            )
            return res.status(201).json({ apiSuccessMessage: "Product added to Cart" })
        } else {
            const updatable = await Cart.findOneAndUpdate({ user_id: user_id }, { $push: { items: { product_id, size, qty } } }, { new: false })
            return res.status(201).json({ apiSuccessMessage: "Product added to Cart" })
        }
    }
    catch (err) {
        return res.status(500).json({ err: err, apiErrorMessage: "An error occured, item was not added to cart" })
    }

}

export const deleteFromCart = async (req, res) => {
    try {
        const { user_id, product_id, size } = req.params;
        const checkCart = await Cart.findOne({ $and: [{ user_id: user_id }, { items: { $elemMatch: { product_id: product_id } } }, { items: { $elemMatch: { size: size } } }] });
        if (!checkCart) {
            return res.status(400).json({ apiErrorMessage: "No such item in user cart" })
        }
        const deletable = await Cart.findOneAndUpdate({ user_id: user_id }, { $pull: { items: { $and: [{ product_id: product_id }, { size: size }] } } }, { new: false })
        res.status(201).json({ apiSuccessMessage: "Item deleted from cart" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: err, apiErrorMessage: "An error occured, item was not deleted from cart" })
    }

}

export const updateCart = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { product_id, size, qty, oldSize, oldQty } = req.body;

        const checkCart = await Cart.findOne({
            user_id: user_id,
            "items.product_id": product_id,
            "items.size": oldSize
        })
        if (!checkCart) {  // no item exists
            return res.status(400).json({ apiErrorMessage: "No such item in user cart" })
        }

        if (size === oldSize) { // only qty is different
            const update = await Cart.findOneAndUpdate({
                user_id: user_id,
                items: { $elemMatch: { product_id: product_id, size: size } }
            },
                {
                    $set: { "items.$.qty": qty },
                }
            )
            res.status(200).json({ apiSuccessMessage: "Cart updated" })
        } else {
            const checkDuplicateItem = await Cart.findOne({
                user_id: user_id,
                items: { $elemMatch: { product_id: product_id, size: size } }
            })
            if (!checkDuplicateItem) {
                const update = await Cart.findOneAndUpdate({
                    user_id: user_id,
                    items: { $elemMatch: { product_id: product_id, size: oldSize } }

                },
                    {
                        $set: { "items.$.qty": qty, "items.$.size": size },
                    }
                )
                return res.status(200).json({ apiSuccessMessage: "Cart updated" })
            } else {
                // agar duplicate mil gaya same size wala
                const update = await Cart.findOneAndUpdate({
                    user_id: user_id,
                    items: { $elemMatch: { product_id: product_id, size: size } }
                },
                    {
                        $inc: { "items.$.qty": qty },
                    })
                const deletePrevious = await Cart.findOneAndUpdate({
                    user_id: user_id,
                    items: { $elemMatch: { product_id: product_id, size: oldSize } }
                },
                    {
                        $pull: { items: { product_id: product_id, size: oldSize } },
                    })
                return res.status(200).json({ apiSuccessMessage: "Cart updated" })
            }
        }
    } catch (err) {
        res.status(500).json({ err: err, apiErrorMessage: "error occured, cart not updated" })
    }
}
