import Product from "../models/productModel.js"
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url));



export const createProduct = async (req, res) => {
    const {
        name,
        short_desc,
        brand,
        sizes,
        category,
        description,
        sole_materials,
        shoe_materials,
        dimensions,
        weight,
        gender,
        occasion,
        color,
        tags,
        meta_info
    } = req.body
    const images = [];
    if (req.files) {
        req.files.forEach(item => {
            images.push(item.filename)
        })
    }
    const newProduct = new Product({
        display_id: uuidv4(),
        name: name,
        short_desc: short_desc,
        brand: JSON.parse(brand)._id,
        category: JSON.parse(category)._id,
        sizes: JSON.parse(sizes).filter(item => (
            {
                label: item.label,
                stock: item.stock,
                price: item.price,
                discountPercentage: item.discountPercentage
            }
        )),
        images: images,
        additional_details: {
            description: description,
            specifications: {
                gender: gender,
                shoe_materials: shoe_materials.split(',').map(el => el.trim()),
                sole_materials: sole_materials.split(',').map(el => el.trim()),
                occasion: occasion,
                tags: JSON.parse(tags),
                color: {
                    name: JSON.parse(color).name,
                    hex: JSON.parse(color).hex
                },
                dimensions: {
                    unit: JSON.parse(dimensions).unit,
                    width: JSON.parse(dimensions).width,
                    length: JSON.parse(dimensions)['length'],
                    height: JSON.parse(dimensions).height
                },
                weight: {
                    unit: JSON.parse(weight).unit,
                    value: JSON.parse(weight).value
                },
            }
        },
        meta_info: JSON.parse(meta_info)
    })
    try {
        const result = await newProduct.save()
        res.status(201).json({ created: true, err: null })
    } catch (err) {
        // unlink images here
        if (req.files) {
            req.files.forEach(item => {
                fs.unlinkSync(path.join(__dirname, "..", "uploads/product_images", item.filename))
            });
        }
        res.status(500).json({ created: false, err: err })
    }
}

// todo : make a sendable
export const fetchProductsList = async (req, res) => {
    try {
        const { category, brand, color, gender, size, sort, order, page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 15;
        const orderBy = order || "asc";
        const skip = (pageNumber - 1) * pageSize;
        const categories = Array.isArray(category) ? category : category ? category.split(',') : [];
        const brands = Array.isArray(brand) ? brand : brand ? brand.split(',') : [];
        const colors = Array.isArray(color) ? color : color ? color.split(',') : [];
        const sizes = Array.isArray(size) ? size : size ? size.split(',') : [];
        let sortOptions = {};
        switch (sort) {
            case 'price':
                sortOptions = { "sizes.0.price": orderBy }
                break;
            case 'discountPercentage':
                sortOptions = { "sizes.0.discountPercentage": orderBy }
                break;
            default:
                sortOptions = { "createdAt": "asc" }
                break;
        }
        console.log(sortOptions)

        const query = {};
        if (categories && categories.length > 0) {
            query.category = { $in: categories };
        }
        if (brands && brands.length > 0) {
            query.brand = { $in: brands };
        }
        if (colors && colors.length > 0) {
            query['additional_details.specifications.color.name'] = { $in: colors.map(el => (new RegExp(el, "i"))) };
        }
        if (sizes && sizes.length > 0) {
            query.sizes = { $elemMatch: { label: { $in: sizes.map(el => (new RegExp(el, "i"))) } } }
        }
        if (gender) {
            query['additional_details.specifications.gender'] = new RegExp(gender, "i")
        }
        const products = await Product.find(query)
            .populate('brand')
            .populate('category')
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize)
            .exec();
        const totalItems = await Product.countDocuments(query);
        res.status(201).json({ totalProducts: totalItems, data: products })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

export const fetchProductById = async (req, res) => {
    try {
        const { product_id, size } = req.params;
        const result = await Product.findOne({ _id: product_id }).populate('brand').populate('category');
        if (!result) {
            res.status(400).json({ message: "No Product Found" })
        }
        const checkSize = mongoose.Types.ObjectId.isValid(size) && await Product.findOne({ $and: [{ _id: product_id }, { sizes: { $elemMatch: { _id: size } } }] })
        let currSize;
        if (!checkSize) {
            currSize = result.sizes[0];
        } else {
            currSize = result.sizes.find(el => el._id.toString() === size)
        }
        const sendable = {
            ...result._doc,
            currSize: {
                mrp: currSize.price,
                sp: currSize.price * (1 - (currSize.discountPercentage / 100)),
                discountPercentage: currSize.discountPercentage,
                stock: currSize.stock,
                _id: currSize._id,
                label: currSize.label,
            }
        }
        res.status(201).json(sendable)

    } catch (err) {
        res.status(400).json({ err: err, message: "An error occured, Product not found" })
    }
}


// change image paths
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ err: "no id recieved" });
    }
    const {
        name,
        short_desc,
        brand,
        sizes,
        category,
        description,
        sole_materials,
        shoe_materials,
        dimensions,
        weight,
        gender,
        occasion,
        color,
        tags
    } = req.body

    // remove previous images
    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
        return res.status(400).json({ err: "Invalid ID" });
    }
    const oldImages = oldProduct.images;
    oldImages.forEach(item => {
        const imagePath = path.join(__dirname, '..', 'uploads/product_images', item);
        fs.unlinkSync(imagePath);
    })
    const images = [];
    if (req.files) {
        req.files.forEach(item => {
            images.push(item.filename)
        })
    }
    const modified = {
        name: name,
        short_desc: short_desc,
        brand: JSON.parse(brand)._id,
        category: JSON.parse(category)._id,
        sizes: JSON.parse(sizes).filter(item => (
            {
                label: item.label,
                stock: item.stock,
                price: item.price,
                discountPercentage: item.discountPercentage
            }
        )),
        images: images,
        additional_details: {
            description: description,
            specifications: {
                gender: gender,
                shoe_materials: shoe_materials.split(',').map(el => el.trim()),
                sole_materials: sole_materials.split(',').map(el => el.trim()),
                occasion: occasion,
                tags: JSON.parse(tags),
                color: {
                    name: JSON.parse(color).name,
                    hex: JSON.parse(color).hex
                },
                dimensions: {
                    unit: JSON.parse(dimensions).unit,
                    width: JSON.parse(dimensions).width,
                    length: JSON.parse(dimensions)['length'],
                    height: JSON.parse(dimensions).height
                },
                weight: {
                    unit: JSON.parse(weight).unit,
                    value: JSON.parse(weight).value
                },
            }
        },
        meta_info: JSON.parse(meta_info)
    }
    try {
        const updatable = await Product.findOneAndUpdate({ _id: id }, modified);
        res.status(201).json({ message: "Product Updated Successfully" })
    } catch (err) {
        res.status(400).json({ updated: false, err: err })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ err: "Invalid ID" });
    }
    const oldImages = product.images;
    oldImages.forEach(item => {
        const imagePath = path.join(__dirname, '..', 'uploads/product_images', item);
        fs.unlinkSync(imagePath);
    })
    try {
        const deleteable = await Product.deleteOne({ _id: id })
        res.status(201).json({ deleted: true, message: "Product Deleted Successfully" })
    } catch (err) {
        res.status(400).json({ err: err, deleted: false })
    }
}


// admin controls
export const fetchAllProductsAdmin = async (req, res) => {
    try {
        const result = await Product.find().populate('brand').populate('category');
        res.status(201).json({ data: result, err: null })
    } catch (err) {
        res.status(400).json({ data: null, err: err })
    }
}

export const fetchColors = async (req, res) => {
    try {
        const products = await Product.find();
        const colors = products.map(el => el.additional_details.specifications.color.name);
        res.status(201).json(colors);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const fetchGenders = async (req, res) => {
    try {
        const products = await Product.find();
        const genders = products.map(el => el.additional_details.specifications.gender);
        res.status(201).json(genders);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const fetchSizes = async (req, res) => {
    try {
        const products = await Product.find();
        const genders = products.map(el => el.sizes.map);
        res.status(201).json(genders);
    } catch (error) {
        res.status(400).json(error);
    }
}
