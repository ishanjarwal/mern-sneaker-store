import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    display_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

const Brand = model('Brand', brandSchema);
export default Brand
