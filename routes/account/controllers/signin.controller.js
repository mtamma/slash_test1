const passport = require('passport');

const signinFn = function (req, res) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (!user) {
            return res.status(401, json(info));
        }
        const token = user.generateJwt();
        res.status(200);
        res.json({
            token: token
        });
    });
}

module.exports = signinFn;