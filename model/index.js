const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const dbName = 'slash-test';
const userName = 'test';
const userPassword = 'remember_me';
const connectionString = [
    'mongodb://',
    userName,
    ':',
    userPassword,
    '@',
    'localhost:27017/',
    dbName
].join('');
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to db error'));
db.once('open', () => {
    console.log('mongo db connected');
});

//Bring in your schema & mongoose.models
require('./user');