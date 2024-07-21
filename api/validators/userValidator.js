import { body } from 'express-validator';

export const validateUser = [
    // Validate email
    body('email')
        .notEmpty().withMessage("Please provide an email")
        .isEmail()
        .withMessage('Invalid email address')
        .bail(),

    // Validate full name
    body('fullname')
        .trim()
        .notEmpty().withMessage("Please provide your name").bail()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('only alphabets and spaces allowed')
        .bail()
        .custom((value) => {
            const trimmedValue = value.trim();
            const spaceCount = (trimmedValue.match(/\s/g) || []).length;
            if (spaceCount > 2) {
                throw new Error('at most two spaces allowed');
            }
            return true;
        })
        .bail(),
];

export const validatePassword = [
    body('password')
        .notEmpty().withMessage("Please provide a password")
        .matches(/^[A-Za-z0-9@#$%^&*!]+$/)
        .withMessage('Password should only contain letters, numbers, and @ # $ % ^ & * !')
        .bail()
        .not()
        .matches(/\s/)
        .withMessage('Password should not contain spaces')
        .bail()
]
