exports.messages = {
    common: {
        validation: {
            emailRequired: 'Valid email address must be provided',
            passwordLength: 'Password must be at least 6 characters'
        }
    },
    signup: {
        validation: {
            nameRequired: 'Name must be provided',
            emailExists: 'A user with this email already exists',
            error: 'There are validation errors in request'
        },
        success: 'Signup completed successfully, Please Signin',
        error: 'An error occurred during signup',
        activation: {
            email: {
                success: 'Email has been sent to your email address. Follow the instruction to activate your account',
                error: 'Error occurred while sending account activation email',
                subject: 'ACCOUNT ACTIVATION LINK'
            },
            error: 'Error occurred while activating the account'
        }
    },
    signin: {
        emailNotExists: 'User with this email does not exist. Please signup',
        incorrectPassword: 'Email or password is incorrect. Please try again',
        error: 'An error occurred during signin'
    }
};