import express from 'express'
import { createBrand, fetchBrands, updateBrand } from '../controllers/brandController.js';
import isAdmin from '../middlewares/isAdmin.js'
import isAuth from '../middlewares/isAuth.js'

const brandRouter = express.Router();

brandRouter
    .get('/', fetchBrands)
    .post('/', isAuth, isAdmin, createBrand) // admin only
    .patch('/', isAuth, isAdmin, updateBrand) // admin only

export default brandRouter