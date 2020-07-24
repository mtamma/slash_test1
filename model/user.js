const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    token: String,
    hash: String,
    salt: String,
});

//function to create hashed password from raw password
userSchema.methods.setPassword = function( password ){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
};

//function to check if user suplied password mach saved password
userSchema.methods.isValidPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
    return this.hash === hash;
};

//function to generate JWT token for this user
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime()/1000),
    }, 'SECRET'); // do not save secret in code //TODO
};

mongoose.model('User', userSchema);