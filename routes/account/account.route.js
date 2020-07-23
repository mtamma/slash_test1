const signinCtrl = require('./controllers/signin.controller');

const router = function (router, auth) {
    router.get('/signin', signinCtrl)
}

module.exports = router;