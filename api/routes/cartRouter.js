import express from 'express'
import { fetchCart, addToCart, deleteFromCart, updateCart, filterCart } from '../controllers/cartController.js';
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateProductDB } from '../middlewares/validateProductDB.js';
import { validateSizeDB } from '../middlewares/validateSizeDB.js';
import { isAuth } from '../middlewares/isAuth.js';
import { validateCartItem } from '../middlewares/validateCartItem.js';
import { validateQtyDB } from '../middlewares/validateQtyDB.js';


const cartRouter = express.Router();

cartRouter
    .get('/filter-cart', isAuth, filterCart)
    .get('/', isAuth, fetchCart)
    .post('/',
        isAuth,
        validateProductDB,
        (req, res, next) => { validateSizeDB(req, res, next, req.body.size) },
        (req, res, next) => { validateQtyDB(req, res, next, req.body) },
        addToCart)
    .delete('/:item_id',
        isAuth,
        (req, res, next) => { validateCartItem(req, res, next, req.params.item_id) },
        deleteFromCart
    )
    .patch('/:item_id',
        isAuth,
        (req, res, next) => { validateCartItem(req, res, next, req.params.item_id) },
        validateProductDB,
        (req, res, next) => { validateSizeDB(req, res, next, req.body.size) },
        // (req, res, next) => { validateQtyDB(req, res, next, req.body) },
        updateCart)

export default cartRouter