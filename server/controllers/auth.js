const User = require('../models/user');
const { codes } = require('../utils/responseCodes');
const { messages } = require('../utils/messages');

exports.signup = async (req, res) => {
    try {
        // console.log('Req Body', req.body);
        const { name, email, password } = req.body;

        // Already existing User?
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(codes.badRequest).json({
                error: messages.emailExists
            })
        }

        // Create new user
        let newUser = new User(req.body);
        newUser = await newUser.save();

        res.status(codes.ok).json({
            message: messages.signupSuccess
        });
    }
    catch(error) {
        console.error(messages.signupError, error);
    }
    
};

// exports.signup = async (req, res) => {
// };