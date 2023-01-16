const { check } = require('express-validator');
const { messages } = require('../utils/messages');

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage(messages.signup.validation.nameRequired),
    check('email').isEmail().withMessage(messages.common.validation.emailRequired),
    check('password').isLength({ min: 6 }).withMessage(messages.common.validation.passwordLength)
];

exports.userSigninValidator = [
    check('email').isEmail().withMessage(messages.common.validation.emailRequired),
    check('password').isLength({ min: 6 }).withMessage(messages.common.validation.passwordLength)
];