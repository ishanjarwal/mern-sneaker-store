import mongoose, { model, Schema } from 'mongoose';
import { addressSchema } from './userModel.js';


const itemSchema = new Schema({
    id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    size_id: { type: Schema.Types.ObjectId, required: true, ref: 'Size' },
    size_label: { type: String, required: true }
}, { _id: false });

const orderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [itemSchema],
    shipping_address: addressSchema,
    payment_method: { type: String, enum: ['cod', 'other'], required: true },
    payment_status: { type: String, enum: ['completed', 'due'], required: true, default: 'due' },
    status: { type: String, enum: ['pending', 'placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    total_amount: { type: Number, required: true },
    total_items: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    placed_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
    payment_details: {
        method: { type: String }, // e.g., credit card, UPI, debit card, wallet
        card_id: { type: String }, // Card ID in case of card payment
        vpa: { type: String } // Virtual Payment Address in case of UPI payment
    }
});

const Order = model('Order', orderSchema);
export default Order