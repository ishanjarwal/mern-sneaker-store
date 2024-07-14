import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    plot_no: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    address_line_1: { type: String, required: true },
    address_line_2: { type: String },
    landmark: { type: String },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
})

const userSchema = new Schema({
    display_id: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer', required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false, sparse: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },
    addresses: [{ type: addressSchema, required: false }],
    passwordResetToken: {
        token: { type: String, default: null },
        expiry: { type: Date }
    }
}, { timestamps: true });


userSchema.index({ phone: 1 }, { unique: true, sparse: true });

userSchema.virtual('cart', {
    ref: 'Cart', // The model to use
    localField: '_id', // Find the cart where `localField`
    foreignField: 'user_id', // is equal to `foreignField`
    justOne: true // Use justOne option to return a single document
});

userSchema.virtual('wishlist', {
    ref: 'Wishlist', // The model to use
    localField: '_id', // Find the cart where `localField`
    foreignField: 'user_id', // is equal to `foreignField`
    justOne: true // Use justOne option to return a single document
});

// Set the toObject and toJSON options to include virtuals
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = model('User', userSchema);
export default User
