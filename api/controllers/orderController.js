import dotenv from 'dotenv';
dotenv.config();
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js'
import User from '../models/userModel.js';
import Razorpay from 'razorpay'
import crypto from 'crypto'

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const fetchOrders = async (req, res) => {
    try {
        const { user } = req;
        const orders = await Order.find({ customer_id: user._id }).sort({ placed_at: -1 })
        return res.status(200).json({ status: "success", data: orders })
    } catch (err) {
        return res.status(500).json({ status: 'error', message: "Something went wrong", err });
    }
}

// only for admin
export const fetchAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer_id').sort({ placed_at: -1 })
        return res.status(200).json(orders)
    } catch (err) {
        return res.status(500).json(err);
    }
}


export const fetchOrder = async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const order = await Order.findOne({ customer_id: user._id, _id: id })
        if (!order) {
            return res.status(400).json({ status: 'fail', message: "order not found" });
        }
        return res.status(200).json({ status: "success", data: order })
    } catch (err) {
        return res.status(500).json({ status: 'error', message: "Something went wrong", err });
    }
}


// only admin
export const updateStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const updatable = await Order.findOneAndUpdate(
            { _id: id },
            { status: status },
            {
                new: true,
                runValidators: true, // Run schema validators
                context: 'query' // Required for validators to work properly on update
            }
        )
        return res.status(200).json(updatable?.status)
    } catch (err) {
        return res.status(500).json(err);
    }
}

// only admin
export const updatePaymentStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const updatable = await Order.findOneAndUpdate(
            { _id: id },
            { payment_status: status },
            {
                new: true,
                runValidators: true, // Run schema validators
                context: 'query' // Required for validators to work properly on update
            }
        )
        return res.status(200).json(updatable?.payment_status)
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const getRazorpayKeyID = async (req, res) => {
    try {
        res.status(200).json({ status: "success", message: "razorpay key fetched", data: process.env.RAZORPAY_KEY_ID });
    } catch (err) {
        res.status(500).json({ status: "error", message: "something went wrong", err })
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

        const orderItems = await Promise.all(items.map(async item => {
            const product = await Product.findOne(
                { _id: item.id, sizes: { $elemMatch: { _id: item.size } } },
                { name: 1, "sizes.$": 1, _id: 1, images: { $slice: 1 } }
            );
            return {
                id: product._id,
                name: product.name,
                thumbnail: product.images[0],
                price: product.sizes[0].price,
                quantity: item.quantity,
                total_price: product.sizes[0].price * item.quantity,
                size_id: product.sizes[0]._id,
                size_label: product.sizes[0].label
            };
        }));
        const total_items = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
        const total_amount = orderItems.reduce((acc, curr) => acc + curr.total_price, 0);

        const newOrder = new Order({
            customer_id: user._id,
            items: orderItems,
            shipping_address: userAddress,
            payment_method: payment_method,
            total_amount: total_amount,
            total_items: total_items
        })

        if (payment_method === 'cod') {
            newOrder.status = 'placed';
            const createdOrder = await newOrder.save();
            await Promise.all(items.map(async item => {
                await Product.findOneAndUpdate(
                    { _id: item.id, sizes: { $elemMatch: { _id: item.size } } },
                    {
                        $inc: { "sizes.$.stock": -1 * (item.quantity) }
                    });
            }));
            return res.status(200).json({ status: "success", message: "order successfull", cod: true })
        } else {
            const order = await razorpay.orders.create({
                amount: total_amount * 100, // amount in the smallest currency unit
                currency: 'INR',
                // receipt: createdOrder._id
            });
            newOrder.razorpay_order_id = order.id;
            const createdOrder = await newOrder.save();
            return res.status(201).json({ status: "success", message: "order created", data: order });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 'error', message: "Something went wrong", err });
    }
}


export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ status: "fail", message: "payment not verified" })
    }

    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    const paymentMethodDetails = {
        method: paymentDetails.method,
        card_id: paymentDetails.card_id || null,
        vpa: paymentDetails.vpa || null
    };

    const order = await Order.findOneAndUpdate(
        { razorpay_order_id },
        { payment_status: 'completed', status: 'placed', razorpay_payment_id, razorpay_signature, payment_details: paymentMethodDetails },
        { new: true }
    );

    if (!order) {
        return res.status(404).json({ status: "fail", message: 'Order not found' });
    }

    const foundOrder = await Order.findOne({ razorpay_order_id });
    await Promise.all(foundOrder.items.map(async item => {
        await Product.findOneAndUpdate(
            { _id: item.id, "sizes._id": item.size_id },
            {
                $inc: { "sizes.$.stock": -1 * (item.quantity) }
            });
    }));

    return res.status(200).json({ status: "success", message: 'Payment verified' });
};