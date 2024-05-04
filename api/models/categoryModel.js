import { Schema, model } from "mongoose";


const categorySchema = new Schema({
    display_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

const Category = model('Category', categorySchema);
export default Category;