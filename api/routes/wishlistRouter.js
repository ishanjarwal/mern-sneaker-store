import express from 'express'
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateProductDB } from '../middlewares/validateProductDB.js';
import { addToWishlist, deleteFromWishlist, fetchWishlist } from '../controllers/wishlistController.js';
import { isAuth } from '../middlewares/isAuth.js'


const wishlistRouter = express.Router();

wishlistRouter
    .get('/', isAuth, fetchWishlist)
    .post('/',
        isAuth,
        validateProductDB,
        addToWishlist)
    .delete('/:product_id',
        isAuth,
        validateProductDB,
        deleteFromWishlist)

export default wishlistRouter