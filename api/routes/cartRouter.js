import express from 'express'
import { fetchCart, addToCart, deleteFromCart, updateCart } from '../controllers/cartController.js';
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateProductDB } from '../middlewares/validateProductDB.js';
import { validateSizeDB } from '../middlewares/validateSizeDB.js';


const cartRouter = express.Router();

cartRouter
    .get('/:user_id', validateUserDB, fetchCart)
    .post('/:user_id',
        validateUserDB,
        validateProductDB,
        (req, res, next) => { validateSizeDB(req, res, next, req.body.size) },
        addToCart)
    .delete('/:user_id/:product_id/:size',
        validateUserDB,
        validateProductDB,
        (req, res, next) => { validateSizeDB(req, res, next, req.params.size) },
        deleteFromCart)
    .patch('/:user_id',
        validateUserDB,
        validateProductDB,
        (req, res, next) => { validateSizeDB(req, res, next, req.body.oldSize) },
        (req, res, next) => { validateSizeDB(req, res, next, req.body.size) },
        updateCart)

export default cartRouter