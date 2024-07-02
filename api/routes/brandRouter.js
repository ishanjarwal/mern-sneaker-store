import express from 'express'
import { createBrand, fetchBrands, updateBrand } from '../controllers/brandController.js';


const brandRouter = express.Router();

brandRouter
    .get('/', fetchBrands)
    .post('/', createBrand)
    .patch('/', updateBrand)

export default brandRouter