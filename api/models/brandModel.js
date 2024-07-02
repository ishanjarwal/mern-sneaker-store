import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    display_id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

brandSchema.virtual('productCount', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'brand',
    count: true // This will create a count of the number of related documents
});

brandSchema.set('toObject', { virtuals: true });
brandSchema.set('toJSON', { virtuals: true });

const Brand = model('Brand', brandSchema);
export default Brand
