import Category from '../models/categoryModel.js'
import { v4 as uuidv4 } from 'uuid';

export const createCategory = async (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({
        name: name,
        display_id: uuidv4()
    })
    try {
        const result = await newCategory.save();
        res.status(201).json({ created: true })
    } catch (err) {
        res.status(400).json({ created: false, err: err })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name, id } = req.body;
        const updatable = await Category.findById(id);
        updatable.name = name;
        await updatable.save();
        res.status(201).json({ updated: true })
    } catch (err) {
        res.status(400).json({ updated: false, err: err })
    }
}

export const fetchCategories = async (req, res) => {
    try {
        const result = await Category.find().populate('productCount').exec();
        res.status(201).json({ data: result, err: null })
    } catch (err) {
        res.status(400).json({ data: null, err: err })
    }
}
