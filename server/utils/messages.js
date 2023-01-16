exports.messages = {
    signup: {
        validation: {
            nameRequired: 'Name must be provided',
            emailRequired: 'Valid email address must be provided',
            emailExists: 'A user with this email already exists',
            passwordLength: 'Password must be at least 6 characters',
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
    }
};