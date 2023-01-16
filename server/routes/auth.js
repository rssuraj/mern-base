const express = require('express');
const router = express.Router();

// import controller
const { signup, accountActivation } = require('../controllers/auth');

// import validators
const { userSignupValidator } = require('../validators/auth');
const { runValidations } = require('../validators');

router.post('/', userSignupValidator, runValidations, signup);
router.post('/activation', accountActivation);

module.exports = router;