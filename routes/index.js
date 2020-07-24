const express = require('express');
let router = express.Router();
const jwt = require('express-jwt');
require('./account/account.route')(router);

module.exports = router;