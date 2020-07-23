const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//configure mongoDb
require('./model');
//init module
require('./init/passpor');

const routesApi = require('./routes');
const passport = require('passport');
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use('/api', routesApi);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

module.exports = app;