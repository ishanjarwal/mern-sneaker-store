import express from 'express'
import { checkAdmin, checkAuth, createUser, fetchUser, loginUser, updateUser, updateUserAddress } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { validateAddress } from '../middlewares/validateAddress.js';


const userRouter = express.Router();

userRouter
    .get("/check-auth", isAuth, checkAuth)
    .get('/:user_id', fetchUser)
    .post('/', createUser)
    .post('/login', loginUser)
    .get("/check-admin", isAdmin, checkAdmin)
    .patch('/:user_id', validateUserDB, validateAddress, updateUser)
    .patch('/address/:user_id', validateUserDB, validateAddress, updateUserAddress)

export default userRouter