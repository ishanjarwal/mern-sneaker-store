import { validationResult } from 'express-validator';
import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    const validationErrors = [];
    if (req.files && req.files.length == 0) {
        validationErrors.push({
            path: "images",
            msg: "Image is required"
        })
    }
    if (!errors.isEmpty()) {
        validationErrors.push(...errors.array());
        if (req.files) {
            req.files.forEach(item => {
                const imagePath = path.join(__dirname, '..', 'uploads/product_images', item.filename);
                fs.unlinkSync(imagePath);
            })
        }
        return res.status(400).json({ validationErrors });
    }
    next();
};