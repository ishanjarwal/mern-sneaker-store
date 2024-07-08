import express from 'express'
import { checkAdmin, checkAuth, createUser, fetchUser, fetchUsers, loginUser, logoutUser, resetPassword, sendResetPasswordToken, updateUser, updateUserAddress } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateAddress } from '../middlewares/validateAddress.js';


const userRouter = express.Router();

userRouter
    .get("/check-auth", isAuth, checkAuth)
    .get('/logout', logoutUser)
    .get('/:user_id', fetchUser)
    .get('/', fetchUsers)
    .get('/password-token/:user_id', validateUserDB, sendResetPasswordToken)
    .post('/reset-password/:user_id/:token', validateUserDB, resetPassword)
    .post('/', createUser)
    .post('/login', loginUser)
    .get("/check-admin", isAdmin, checkAdmin)
    .patch('/:user_id', validateUserDB, updateUser)
    .patch('/address/:user_id', validateUserDB, validateAddress, updateUserAddress)

export default userRouter