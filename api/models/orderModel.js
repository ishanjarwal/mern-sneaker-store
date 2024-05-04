import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    uid: { type: Schema.type.ObjectId, required: true, ref: "User" },
    payment_option: {
        type: String,
        required: true,
        enum: ['card', 'cod', 'net banking', 'upi'],
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    delivery_status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    items: [
        {
            pid: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
            qty: { type: Number, required: true },
            size: { type: String, required: true },
            price: { type: Number, required: true },
            discountPercentage: { type: Number, required: true }
        }
    ],
    order_total: { type: Number, required: true },
    return: {
        status: { type: String },
        items: [
            {
                pid: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
                qty: { type: Number, required: true },
                size: { type: String, required: true },
                price: { type: Number, required: true },
                discountPercentage: { type: Number, required: true }
            }
        ]
    }
})

const Order = model('Order', orderSchema);
export default Order