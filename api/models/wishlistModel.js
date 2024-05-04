import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true })
const wishlistSchema = new Schema({
    display_id: { type: String, required: true },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: { type: [itemSchema] }
});

const Wishlist = model('Wishlist', wishlistSchema);
export default Wishlist;
