import Brand from "../models/brandModel.js";
import { v4 as uuidv4 } from 'uuid';

export const createBrand = async (req, res) => {
    const { name } = req.body;
    const newBrand = new Brand({
        name: name,
        display_id: uuidv4()
    })
    try {
        const result = await newBrand.save();
        res.status(201).json({ created: true, err: null })
    } catch (err) {
        res.status(400).json({ created: false, err: err })
    }
}

export const updateBrand = async (req, res) => {
    try {
        const { name, id } = req.body;
        const updatable = await Brand.findById(id);
        updatable.name = name;
        await updatable.save();
        res.status(201).json({ updated: true })
    } catch (err) {
        res.status(400).json({ updated: false, err: err })
    }
}

export const fetchBrands = async (req, res) => {
    try {
        const result = await Brand.find().populate('productCount').exec();
        res.status(201).json({ data: result, err: null })
    } catch (err) {
        res.status(400).json({ data: null, err: err })
    }
}
