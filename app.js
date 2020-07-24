const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//configure mongoDb
require('./model');
//init module
require('./init/passport');

const routesApi = require('./routes');
const app = express();
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

//Add headers
//credit: https://stackoverflow.com/a/18311469
app.use(function (req, res, next) {
    var listAllowedOrigins = ['http://localhost:8081'];
    var origin = req.headers.origin;
    if (listAllowedOrigins.indexOf(origin) > -1) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use('/api', routesApi);

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res){
    if(err.name === 'UnauthorizedError'){
        res.status(401);
        res.json({'err msg' : err.name + ': '+err.message});
    }
});
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;