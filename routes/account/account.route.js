const signinCtrl = require('./controllers/signin.controller');

const router = function (router, auth) {
    router.post('/signin', signinCtrl)
}

module.exports = router;