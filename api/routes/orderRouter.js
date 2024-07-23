import express from 'express'
import { createOrder, fetchOrders, getRazorpayKeyID, verifyPayment } from "../controllers/orderController.js";
import validateOrder from '../validators/orderValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import { isAuth } from '../middlewares/isAuth.js'




const orderRouter = express.Router();

orderRouter
    .post('/', isAuth, validateOrder, handleValidationErrors, createOrder)
    .post('/verify-payment', isAuth, verifyPayment)
    .get('/get-razorpay-key-id', isAuth, getRazorpayKeyID)
    .get('/', isAuth, fetchOrders)

export default orderRouter