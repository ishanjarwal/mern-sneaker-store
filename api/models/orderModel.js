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
});

const orderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [itemSchema],
    shipping_address: addressSchema,
    payment_method: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'cod', 'upi'], required: true },
    payment_status: { type: String, enum: ['completed', 'due'], required: true, default: 'due' },
    status: { type: String, enum: ['pending', 'placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    total_amount: { type: Number, required: true },
    total_items: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    placed_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Order = model('Order', orderSchema);
export default Order