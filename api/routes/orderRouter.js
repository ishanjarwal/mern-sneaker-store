import express from 'express'
import { createOrder, fetchAllOrders, fetchOrder, fetchOrders, getRazorpayKeyID, updatePaymentStatus, updateStatus, verifyPayment } from "../controllers/orderController.js";
import validateOrder from '../validators/orderValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js'
import isAuth from '../middlewares/isAuth.js'
import isAdmin from '../middlewares/isAdmin.js';




const orderRouter = express.Router();

orderRouter
    .post('/', isAuth, validateOrder, handleValidationErrors, createOrder)
    .post('/verify-payment', isAuth, verifyPayment)
    .get('/get-razorpay-key-id', isAuth, getRazorpayKeyID)
    .get('/all-orders', isAuth, isAdmin, fetchAllOrders) //only for admin
    .get('/:id', isAuth, fetchOrder)
    .get('/', isAuth, fetchOrders)
    .patch('/update-payment-status', isAuth, isAdmin, updatePaymentStatus) // only for admin
    .patch('/update-status', isAuth, isAdmin, updateStatus) // only for admin


export default orderRouter