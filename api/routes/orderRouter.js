import express from 'express'
import { createOrder, fetchOrders } from "../controllers/orderController.js";
import validateOrder from '../validators/orderValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import { isAuth } from '../middlewares/isAuth.js'




const orderRouter = express.Router();

orderRouter
    .post('/', isAuth, validateOrder, handleValidationErrors, createOrder)
    .get('/', isAuth, fetchOrders)

export default orderRouter