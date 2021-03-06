var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var classrooms = require('./routes/classrooms');
var cohorts = require('./routes/cohorts');

var app = express();

//Mongoose setup
//var mongoURI = process.env.MONGOLAB_URI;
//var mongoURI = "mongodb://localhost:27017/classroom_app";
//var mongoURI = "mongodb://prime:classy@ds035300.mongolab.com:35300/classroom_app";
//var mongoURI = "mongodb://heroku_9734fn1w:e9kv8js07cu8jq29l6spn1kl8l@ds035553.mongolab.com:35553/heroku_9734fn1w";
var mongoURI = "mongodb://casie:kubRA6Ub@ds033123.mongolab.com:33123/apptest";

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/cohorts', cohorts);
app.use('/classrooms', classrooms);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).send(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
