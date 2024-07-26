import { validationResult } from 'express-validator';
import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const __dirname = dirname(fileURLToPath(import.meta.url));


export const handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    const validationErrors = [];
    if (req.files && req.files.length <= 0) {
        validationErrors.push({
            path: "images",
            msg: "Image is required"
        })
    }
    if (req.files && req.files.length > 6) {
        validationErrors.push({
            path: "images",
            msg: "At most 6 Images"
        })
    }
    if (!errors.isEmpty() || validationErrors.length > 0) {
        validationErrors.push(...errors.array());
        // for multer
        // if (req.files) {
        //     req.files.forEach(item => {
        //         const imagePath = path.join(__dirname, '..', 'uploads/product_images', item.filename);
        //         fs.unlinkSync(imagePath);
        //     })
        // }

        // for cloudinary
        if (req.files) {
            await Promise.all(req.files.map(file => {
                return cloudinary.uploader.destroy(file.filename);
            }))
        }
        return res.status(400).json({ validationErrors });
    }
    next();
};