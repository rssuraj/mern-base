const { validationResult } = require('express-validator');
const { messages } = require('../utils/messages');
const { codes } = require('../utils/responseCodes');

exports.runValidations = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(codes.unprocessableEntity).json({
            message: messages.validationError,
            error: errors.errors
        });
    }

    // No errors, move forward with execution
    next();
};