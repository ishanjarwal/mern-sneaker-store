import { Schema, model } from 'mongoose';
import { Size } from './productModel.js';

const itemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: { type: Schema.Types.ObjectId, ref: 'Size' },
    qty: { type: Number, default: 1 },
}, { timestamps: true })

const cartSchema = new Schema({
    display_id: { type: String, required: true },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: { type: [itemSchema] }
});

const Cart = model('Cart', cartSchema);
export default Cart
