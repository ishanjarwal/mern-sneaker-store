import express from 'express'
import { checkAdmin, checkAuth, createUser, deleteUserAddress, fetchUser, fetchUsers, loginUser, logoutUser, resetPassword, sendResetPasswordToken, updateUser, updateUserAddress } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateAddress } from '../validators/addressValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';
import { validateUser, validatePassword } from '../validators/userValidator.js'

const userRouter = express.Router();

userRouter
    .get("/check-auth", isAuth, checkAuth)
    .get('/logout', logoutUser)
    .get('/password-token', isAuth, sendResetPasswordToken)
    .get('/:user_id', fetchUser)
    .get('/', fetchUsers)
    .post('/reset-password/:token', isAuth, resetPassword)
    .post('/', validateUser, validatePassword, handleValidationErrors, createUser)
    .post('/login', loginUser)
    .get("/check-admin", isAdmin, checkAdmin)
    .patch(
        '/address',
        isAuth,
        validateAddress,
        handleValidationErrors,
        updateUserAddress
    )
    .patch('/', isAuth, validateUser, handleValidationErrors, updateUser)
    .delete('/address/:id', isAuth, deleteUserAddress)

export default userRouter