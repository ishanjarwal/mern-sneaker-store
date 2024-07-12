import mongoose, { Schema, model } from 'mongoose';
import { Size } from './productModel.js';

const itemSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: { type: Schema.Types.ObjectId, ref: 'Size' },
    qty: { type: Number, default: 1 },
}, { timestamps: true });

const cartSchema = new Schema({
    display_id: { type: String, required: true },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: { type: [itemSchema], required: false }
}, { timestamps: true });

// Create the unique sparse index on the items array fields
cartSchema.index({
    "items.product_id": 1,
    "items.size": 1
}, {
    unique: true,
    sparse: true
});

const Cart = model('Cart', cartSchema);
export default Cart
