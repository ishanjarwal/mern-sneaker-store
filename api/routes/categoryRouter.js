import express from 'express'
import { createCategory, fetchCategories, updateCategory } from '../controllers/categoryController.js';


const categoryRouter = express.Router();

categoryRouter
    .get('/', fetchCategories)
    .patch('/', updateCategory)
    .post('/', createCategory)

export default categoryRouter