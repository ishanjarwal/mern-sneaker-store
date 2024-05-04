const { body } = require("express-validator");

const productValidate = [
    
    //fullname
    body('fullname').isLength({ max: 50 }).withMessage("Name shouldn't be more than 50 characters")
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.')
        .custom((value) => {
            if (value.trim().split(' ').length > 2) {
                return false;
            } else {
                return true;
            }
        }).withMessage("Only 2 words are allowed in a name")
    ,
    // email
    body('email', "Invalid Email").isEmail().trim().normalizeEmail(),
    // password
    body('password').isLength({ min: 8 }).withMessage("Atleast 8 characters long")
        .custom(value => !/\s/.test(value)).withMessage("Passwords can't contain spaces.")
]

export default productValidate