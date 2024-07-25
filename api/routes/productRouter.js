import express from 'express'
import { createProduct, deleteProduct, fetchColors, fetchGenders, fetchProductById, fetchProductsList, fetchSizes, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/handleUploads.js';
import validateProduct from '../validators/productValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import isAuth from "../middlewares/isAuth.js"
import multer from 'multer'
import isAdmin from '../middlewares/isAdmin.js';



const productRouter = express.Router();

productRouter
    .get('/', fetchProductsList) // admin only
    .get('/:product_id/:size', fetchProductById)
    .post('/', isAuth, isAdmin, upload, validateProduct, handleValidationErrors, createProduct) // admin only
    .patch('/:id', isAuth, isAdmin, upload, updateProduct) // admin only
    .delete('/:id', isAuth, isAdmin, deleteProduct) // admin only
    .get('/colors', isAuth, isAdmin, fetchColors) // admin only
    .get('/sizes', isAuth, isAdmin, fetchSizes) // admin only
    .get('/genders', isAuth, isAdmin, fetchGenders) // admin only

// Custom error handler for Multer errors
productRouter.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).json({ errors: [{ msg: err.message }] });
    } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).json({ errors: [{ msg: err.message }] });
    }
    // return res.status(500).json("hello");
    next();
});

export default productRouter