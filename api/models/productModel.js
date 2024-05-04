import { Schema, Types, model } from 'mongoose';

const sizeSchema = new Schema({
    label: { type: String, required: true, unique: false },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true }
})

const productSchema = new Schema({
    isDraft: { type: Boolean, required: true, default: false },
    display_id: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    short_desc: { type: String, required: true },
    images: [{ type: String, required: true }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    sizes: [sizeSchema],
    additional_details: {
        description: { type: String, required: true },
        specifications: {
            sole_materials: [{ type: String, required: true }],
            shoe_materials: [{ type: String, required: true }],
            occasion: { type: String, required: true },
            gender: { type: String, enum: ['men', 'women', 'unisex', 'kids'], required: true },
            tags: [String],
            color: {
                name: { type: String, required: true },
                hex: { type: String, required: true }
            },
            dimensions: {
                unit: { type: String, required: true },
                width: { type: Number, required: true },
                length: { type: Number, required: true },
                height: { type: Number, required: true }
            },
            weight: {
                unit: { type: String, required: true },
                value: { type: Number, required: true }
            }
        }
    },
    meta_info: {
        title: { type: String, required: true },
        description: { type: String, required: true }
    }
});

const Product = model('Product', productSchema);
const Size = model('Size', sizeSchema);
export { Size }
export default Product;