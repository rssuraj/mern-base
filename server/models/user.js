const mongoose = require('mongoose');
const crypto = require('crypto');

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    userId: {
        type: String,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, { timestamps: true });

// Virtual 
userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})
.get(function() {
    return this._password;
});

// methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashedPassword;
    },
    encryptPassword: function(password) {
        if(!password) {
            console.error('Empty password provided');
            return '';
        }

        try {
            return crypto.createHmac('sha256', this.salt)
                        .update(password)
                        .digest('hex');
        }
        catch(err) {
            console.error('Error occurred while hashing password');
            return '';
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userSchema);