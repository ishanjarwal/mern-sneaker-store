import { check } from "express-validator";
import Category from "../models/categoryModel.js"
import Brand from "../models/brandModel.js"

const validateProduct = [
    check('name')
        .notEmpty().withMessage('Product Name is required').bail()
        .isString().withMessage('Product Name must be a string'),

    check('short_desc')
        .notEmpty().withMessage('Short description is required').bail()
        .isString().withMessage('Short description must be a string').bail()
        .isLength({ min: 25 }).withMessage('Minimum 25 characters').bail()
        .isLength({ max: 200 }).withMessage('Maximum 200 characters'),

    check('description')
        .notEmpty().withMessage('Description is required').bail()
        .isString().withMessage('Description must be a string').bail()
        .isLength({ min: 300 }).withMessage('Minimum 25 characters').bail()
        .isLength({ max: 1000 }).withMessage('Maximum 200 characters'),

    check('sizes')
        .notEmpty().withMessage('Sizes are required').bail()
        .custom((value) => {
            try {
                const sizesArray = JSON.parse(value);
                if (!Array.isArray(sizesArray)) {
                    throw new Error('Sizes Invalid');
                }
                if (sizesArray.length < 1) {
                    throw new Error('Atleast one size is required');
                }
                const errors = {};
                sizesArray.forEach((size, idx) => {
                    size.price = Number(size.price);
                    size.stock = Number(size.stock);
                    size.discountPercentage = Number(size.discountPercentage);
                    if (typeof size.label !== 'string') {
                        errors[idx] = { ...errors[idx], label: 'Invalid' }
                    }
                    if (Number.isNaN(size.stock) || size.stock < 0) {
                        errors[idx] = { ...errors[idx], stock: 'Invalid' }
                    }
                    if (Number.isNaN(size.price) || size.price <= 0) {
                        errors[idx] = { ...errors[idx], price: 'Invalid' }
                    }
                    if (Number.isNaN(size.discountPercentage) || size.stock < 0) {
                        errors[idx] = { ...errors[idx], discountPercentage: 'Invalid' }
                    }
                    if ([null, undefined, ''].includes(size.label)) {
                        errors[idx] = { ...errors[idx], label: 'Required' }
                    }
                    if ([null, undefined, ''].includes(size.stock)) {
                        errors[idx] = { ...errors[idx], stock: 'Required' }
                    }
                    if ([null, undefined, ''].includes(size.price)) {
                        errors[idx] = { ...errors[idx], price: 'Required' }
                    }
                    if ([null, undefined, ''].includes(size.discountPercentage)) {
                        errors[idx] = { ...errors[idx], discountPercentage: 'Required' }
                    }
                });
                console.log(errors)
                if (Object.keys(errors).length != 0) {
                    throw new Error(JSON.stringify(errors));
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),

    check('category')
        .notEmpty().withMessage('Category is required').bail()
        .custom((value) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const parsed = JSON.parse(value);
                    if (Object.keys(parsed).indexOf("_id") == -1) {
                        return reject(new Error("Category is Required"));
                    }
                    const found = await Category.findById(parsed?._id);
                    if (found) {
                        return resolve(true);
                    }
                    reject(new Error("Invalid Category"));
                } catch (e) {
                    reject(new Error(e.message));
                }
            })
        }),

    check('brand')
        .notEmpty().withMessage('Brand is required').bail()
        .custom((value) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const parsed = JSON.parse(value);
                    if (Object.keys(parsed).indexOf("_id") == -1) {
                        return reject(new Error("Brand is Required"));
                    }
                    const found = await Brand.findById(parsed?._id);
                    if (found) {
                        return resolve(true);
                    }
                    reject(new Error("Invalid Brand"));
                } catch (e) {
                    reject(new Error(e.message));
                }
            })
        }),

    check('dimensions')
        .notEmpty().withMessage('Dimensions are required').bail()
        .isString().withMessage('Dimensions must be a string').bail()
        .custom((value) => {
            try {
                const parsed = JSON.parse(value);
                const errors = {};
                parsed.width = Number(parsed.width);
                parsed.height = Number(parsed.height);
                parsed['length'] = Number(parsed['length']);

                if (typeof parsed?.unit !== 'string') {
                    errors['unit'] = "Invalid Unit";
                }
                if (Number.isNaN(parsed?.width)) {
                    errors['width'] = "Invalid Width";
                }
                if (Number.isNaN(parsed?.["length"])) {
                    errors['length'] = "Invalid Length";
                }
                if (Number.isNaN(parsed?.height)) {
                    eors['height'] = "Invalid Height";
                }
                if (!parsed?.unit) {
                    errors['unit'] = "Required";
                }
                if (!parsed?.width) {
                    errors['width'] = "Required";
                }
                if (!parsed?.["length"]) {
                    errors['length'] = "Required";
                }
                if (!parsed?.height) {
                    errors['height'] = "Required";
                }
                if (Object.keys(errors).length != 0) {
                    throw new Error(JSON.stringify(errors));
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),

    check('shoe_materials')
        .notEmpty().withMessage('Shoe materials are required').bail()
        .isString().withMessage('Shoe materials must be a string seperated by commas'),

    check('sole_materials')
        .notEmpty().withMessage('Sole materials are required').bail()
        .isString().withMessage('Sole materials must be a string seperated by commas'),

    check('occasion')
        .notEmpty().withMessage('Occasion is required').bail()
        .isString().withMessage('Occasion must be a string'),

    check('gender')
        .notEmpty().withMessage('Gender is required').bail()
        .isString().withMessage('Gender must be a string').bail()
        .custom((value) => {
            if (['men', 'women', 'unisex', 'kids'].includes(value.toLowerCase())) {
                return true;
            }
            throw new Error("Invalid Gender");
        })
    ,

    check('tags')
        .notEmpty().withMessage('Tags are required').bail()
        .custom((value) => {
            try {
                const parsed = JSON.parse(value);
                for (let val of parsed) {
                    if (typeof val !== 'string') {
                        throw new Error("Invalid Tags");
                    }
                }
                if (parsed.length < 5) {
                    throw new Error("At least 5 tags are required");
                }
                if (parsed.length > 16) {
                    throw new Error("At most 15 tags are allowed");
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),

    check('color')
        .notEmpty().withMessage('Color is required').bail()
        .custom((value) => {
            try {
                const parsed = JSON.parse(value);
                const errors = {};
                const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                if (!hexColorRegex.test(parsed?.hex)) {
                    errors['hex'] = "Invalid Color Code";
                }
                if (typeof parsed?.name !== 'string') {
                    errors['name'] = "Invalid";
                }
                if (!parsed?.name) {
                    errors['name'] = "Required";
                }
                if (!parsed?.hex) {
                    errors['hex'] = "Required";
                }
                if (Object.keys(errors).length != 0) {
                    throw new Error(JSON.stringify(errors));
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),

    check('weight')
        .notEmpty().withMessage('Weight is required').bail()
        .isString().withMessage('Weight must be a string').bail()
        .custom((value) => {
            try {
                const parsed = JSON.parse(value);
                const errors = {};
                parsed.value = Number(parsed.value);
                if (typeof parsed?.unit !== 'string') {
                    errors['unit'] = "Invalid";
                }
                if (Number.isNaN(parsed.value) || parsed.value < 0) {
                    errors['value'] = "Invalid";
                }
                if (!parsed?.unit) {
                    errors['unit'] = "Required";
                }
                if (!parsed?.value) {
                    errors['value'] = "Required";
                }
                if (Object.keys(errors).length != 0) {
                    throw new Error(JSON.stringify(errors));
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),

    check('meta_info')
        .notEmpty().withMessage('Meta info is required').bail()
        .isString().withMessage('Meta info must be a string').bail()
        .custom((value) => {
            try {
                const parsed = JSON.parse(value);
                const errors = {};
                if (typeof parsed?.title !== 'string') {
                    errors['title'] = "Invalid";
                }
                if (typeof parsed?.description !== 'string') {
                    errors['description'] = "Invalid";
                }
                if (!parsed?.title) {
                    errors['title'] = "Required";
                }
                if (!parsed?.description) {
                    errors['description'] = "Required";
                }
                if (Object.keys(errors).length != 0) {
                    throw new Error(JSON.stringify(errors));
                }
                return true;
            } catch (e) {
                throw new Error(e.message);
            }
        }),
];

export default validateProduct