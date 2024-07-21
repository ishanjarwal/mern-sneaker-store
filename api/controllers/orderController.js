import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'
import User from '../models/userModel.js';

export const fetchOrders = async (req, res) => {
    try {
        const { user } = req;
        const orders = await Order.find({ customer_id: user._id })
        return res.status(200).json({ status: "success", data: orders })
    } catch (err) {
        return res.status(500).json({ status: 'error', message: "Something went wrong", err });
    }
}

export const createOrder = async (req, res) => {
    try {
        const { user } = req;
        const { items, address, payment_method } = req.body;
        const foundUser = await User.findOne({
            _id: user._id,
            addresses: { $elemMatch: { _id: address } }
        }, { "addresses.$": 1 })
        const userAddress = foundUser.addresses[0];
        const addable_items = [];
        for (const item of items) {
            const product = await Product.findOne(
                { _id: item.id, sizes: { $elemMatch: { _id: item.size } } },
                { name: 1, "sizes.$": 1, _id: 1, images: { $slice: 1 } }
            );
            const size = product.sizes[0];
            const price = size.price * (1 - size.discountPercentage / 100);
            const total_price = price * item.quantity;
            addable_items.push({
                id: product._id,
                name: product.name,
                thumbnail: product.images[0],
                quantity: item.quantity,
                total_price: total_price,
                size_id: size._id,
                price: price,
                size_label: size.label
            })
        };

        const total_items = addable_items.reduce((acc, curr) => acc + curr.quantity, 0);
        const total_amount = addable_items.reduce((acc, curr) => acc + curr.total_price, 0);

        const newOrder = new Order({
            customer_id: user._id,
            items: addable_items,
            shipping_address: userAddress,
            payment_method: payment_method,
            payment_status: 'completed',
            status: 'placed',
            total_amount: total_amount,
            total_items: total_items
        })

        // update the stocks
        for (const item of items) {
            const update = await Product.findOneAndUpdate(
                { _id: item.id, sizes: { $elemMatch: { _id: item.size } } },
                { $inc: { "sizes.$.stock": -1 * item.quantity } }
            )
        }
        await newOrder.save();
        return res.status(201).json({ status: "success", message: "Order Successful" });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: "Something went wrong", err });
    }
}