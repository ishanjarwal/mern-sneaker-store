import express from 'express'
import { createProduct, deleteProduct, fetchColors, fetchGenders, fetchProductById, fetchProductsList, fetchSizes, updateProduct } from '../controllers/productController.js';
import { upload } from '../utils/handleUploads.js';
import { validateProductDB } from '../middlewares/validateProductDB.js'


const productRouter = express.Router();

productRouter
    .get('/', fetchProductsList)
    .get('/:product_id/:size', validateProductDB, fetchProductById)
    .post('/', upload, createProduct)
    .patch('/:id', upload, updateProduct)
    .delete('/:id', deleteProduct)
    .get('/colors', fetchColors)
    .get('/sizes', fetchSizes)
    .get('/genders', fetchGenders)


export default productRouter