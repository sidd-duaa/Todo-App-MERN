import { check } from "express-validator";

export const RegisterSchema = [
    check('name')
    .trim().isAlpha()
    .withMessage("Name should be alphabets only"),
    
    check('username', 'Username is required').exists()
    .isAlphanumeric()
    .withMessage("Username should be alphanumeric only")
    .trim().isLength({min:6, max:32}),

    check('password', 'Password is required').exists()
    .isLength({min:6, max:100})
    .trim(),

    check('email', 'Email is required').exists()
    .isEmail(),
]