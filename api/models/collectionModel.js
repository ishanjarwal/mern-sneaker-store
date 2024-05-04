import { Schema, model } from "mongoose";

const collectionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    banner: { type: String, required: true },
    items: [
        { pid: { type: Schema.Types.ObjectId, required: true, ref: 'Product' } }
    ],
    begin: { type: Date, required: true },
    end: { type: Date, required: true }
}, {
    timestamps: true
})

const Collection = model("Collection", collectionSchema);
export default Collection;