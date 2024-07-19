import express from 'express'
import { createProduct, deleteProduct, fetchColors, fetchGenders, fetchProductById, fetchProductsList, fetchSizes, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/handleUploads.js';
import { validateProductDB } from '../middlewares/validateProductDB.js'
import validateProduct from '../validators/productValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { isAuth } from "../middlewares/isAuth.js"
import multer from 'multer'



const productRouter = express.Router();

productRouter
    .get('/', fetchProductsList)
    .get('/:product_id/:size', validateProductDB, fetchProductById)
    .post('/', isAuth, upload, validateProduct, handleValidationErrors, createProduct)
    .patch('/:id', upload, updateProduct)
    .delete('/:id', deleteProduct)
    .get('/colors', fetchColors)
    .get('/sizes', fetchSizes)
    .get('/genders', fetchGenders)

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