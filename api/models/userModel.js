import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    plot_no: { type: String, required: true },
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
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },
    addresses: [{ type: addressSchema, required: false }],
    passwordResetToken: {
        token: { type: String, default: null },
        expiry: { type: Date }
    }
}, { timestamps: true });

const User = model('User', userSchema);
export default User
