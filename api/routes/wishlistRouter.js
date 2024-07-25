import express from 'express'
import { addToWishlist, deleteFromWishlist, fetchWishlist } from '../controllers/wishlistController.js';
import isAuth from '../middlewares/isAuth.js'
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { validateWishlistItem, validateWishlistItemById } from '../validators/wishlistValidator.js';


const wishlistRouter = express.Router();

wishlistRouter
    .get('/', isAuth, fetchWishlist)
    .post('/', isAuth, validateWishlistItem, handleValidationErrors, addToWishlist)
    .delete('/:item_id', isAuth, validateWishlistItemById, handleValidationErrors, deleteFromWishlist)

export default wishlistRouter