import express from 'express'
import { checkAdmin, checkAuth, createUser, deleteUserAddress, fetchUser, fetchUsers, loginUser, logoutUser, resetPassword, sendResetPasswordToken, updateUser, updateUserAddress } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateUserDB } from '../middlewares/validateUserDB.js';
import { filterCart } from '../controllers/cartController.js';
import { validateAddress } from '../validators/addressValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';


const userRouter = express.Router();

userRouter
    .get("/check-auth", isAuth, checkAuth)
    .get('/logout', logoutUser)
    .get('/password-token', isAuth, sendResetPasswordToken)
    .get('/:user_id', fetchUser)
    .get('/', fetchUsers)
    .post('/reset-password/:token', isAuth, resetPassword)
    .post('/', createUser)
    .post('/login', loginUser)
    .get("/check-admin", isAdmin, checkAdmin)
    .patch(
        '/address',
        isAuth,
        validateAddress,
        handleValidationErrors,
        updateUserAddress
    )
    .patch('/:user_id', validateUserDB, updateUser)
    .delete('/address/:id', isAuth, deleteUserAddress)

export default userRouter