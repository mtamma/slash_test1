const express = require('express');
let router = express.Router();
const jwt = require('express-jwt');
let auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload',
    algorithms: ['RS256']
});
require('./account/account.route')(router, auth);

module.exports = router;