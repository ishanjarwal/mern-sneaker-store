import { Schema, model } from "mongoose";


const categorySchema = new Schema({
    display_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

categorySchema.virtual('productCount', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    count: true // This will create a count of the number of related documents
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = model('Category', categorySchema);
export default Category;