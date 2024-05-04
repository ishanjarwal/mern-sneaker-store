import express from 'express'
import { createBrand, fetchBrands } from '../controllers/brandController.js';


const brandRouter = express.Router();

brandRouter
    .get('/', fetchBrands)
    .post('/', createBrand)

export default brandRouter