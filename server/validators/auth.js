const { check } = require('express-validator');
const { messages } = require('../utils/messages');

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage(messages.nameRequired),
    check('email').isEmail().withMessage(messages.emailRequired),
    check('password').isLength({ min: 6 }).withMessage(messages.passwordLength)
];