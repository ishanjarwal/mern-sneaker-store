import express from 'express'
import { createCategory, fetchCategories, updateCategory } from '../controllers/categoryController.js';
import isAuth from '../middlewares/isAuth.js';
import isAdmin from '../middlewares/isAdmin.js';


const categoryRouter = express.Router();

categoryRouter
    .get('/', fetchCategories)
    .patch('/', isAuth, isAdmin, updateCategory) // admin only
    .post('/', isAuth, isAdmin, createCategory) // admin only

export default categoryRouter