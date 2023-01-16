const User = require('../models/user');
const { codes } = require('../utils/responseCodes');
const { messages } = require('../utils/messages');
const { sendSignupActivationEmail, signupActivationEmailTemplate } = require('../utils/email');
const jwt = require('jsonwebtoken');

const { 
    JWT_ACCOUNT_ACTIVATION, 
    JWT_ACCOUNT_ACTIVATION_EXPIRY, 
    EMAIL_ID
} = process.env;

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Already existing User?
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(codes.badRequest).json({
                error: messages.signup.validation.emailExists
            });
        }

        const token = jwt.sign(
            { name, email, password }, 
            JWT_ACCOUNT_ACTIVATION, 
            { expiresIn: JWT_ACCOUNT_ACTIVATION_EXPIRY }
        );

        const emailData = {
            from: EMAIL_ID, 
            to: email, 
            subject: messages.signup.activation.email.subject,
            html: signupActivationEmailTemplate(token),
        };

        sendSignupActivationEmail(req, res, emailData);
    }
    catch(error) {
        console.error(messages.signup.error, error);
        res.status(codes.serverError).json({
            error: messages.signup.error
        });
    }
};

exports.accountActivation = async (req, res) => {
    try {
        const { token } = req.body;

        if(token) {
            await jwt.verify(token, JWT_ACCOUNT_ACTIVATION);

            const { name, email, password } = jwt.decode(token);

            // Create new user
            let newUser = new User({ name, email, password });
            newUser = await newUser.save();

            res.status(codes.ok).json({
                message: messages.signup.success
            });
        }   
    } catch (error) {
        console.error(messages.signup.activation.error, error);
        res.status(codes.serverError).json({
            error: messages.signup.activation.error
        });
    }
};