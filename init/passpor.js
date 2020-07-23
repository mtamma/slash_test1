let passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
(username, password, next) => {
    User.findOne({
        email: username
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, false, {
                message: 'User not found'
            });
        }

        if (!user.isValidPassword(password)) {
            return next(null, false, {
                message: 'Password is wrong'
            });
        }
        return next(null, user);
    });
}));