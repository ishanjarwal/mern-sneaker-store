import express from 'express'
import { fetchCart, addToCart, deleteFromCart, updateCart, filterCart, moveToWishlist } from '../controllers/cartController.js';
import isAuth from '../middlewares/isAuth.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import { validateCartItem, validateCartItemById } from '../validators/cartItemValidator.js'

const cartRouter = express.Router();

cartRouter
    .get('/filter-cart', isAuth, filterCart)
    .get('/', isAuth, fetchCart)
    .post('/', isAuth, validateCartItem, handleValidationErrors, addToCart)
    .delete('/:item_id', isAuth, validateCartItemById, deleteFromCart)
    .get('/move-to-wishlist/:item_id', isAuth, validateCartItemById, handleValidationErrors, moveToWishlist)
    .patch('/:item_id', isAuth, validateCartItemById, validateCartItem, handleValidationErrors, updateCart)

export default cartRouter