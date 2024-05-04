import express from 'express'
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateProductDB } from '../middlewares/validateProductDB.js';
import { addToWishlist, deleteFromWishlist, fetchWishlist } from '../controllers/wishlistController.js';



const wishlistRouter = express.Router();

wishlistRouter
    .get('/:user_id', validateUserDB, fetchWishlist)
    .post('/:user_id',
        validateUserDB,
        validateProductDB,
        addToWishlist)
    .delete('/:user_id/:product_id/',
        validateUserDB,
        validateProductDB,
        deleteFromWishlist)

export default wishlistRouter