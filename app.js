var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");

var index = require('./routes/index');
var users = require('./routes/users');
var signin = require('./routes/signin');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var createNew = require('./routes/createNew');
var mysurveys = require('./routes/mysurveys');
var surveys = require('./routes/surveys');

/*Ajax requests*/
var createNewSurvey = require('./routes/ajax/createNewSurvey');
var publishSurvey = require('./routes/ajax/publishSurvey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Firebase client side SDK*/
var config = {
  apiKey: "AIzaSyD1rJH03SKtvbUqZTBA-Q_diRMuiICwSgY",
  authDomain: "prototype2-ac61d.firebaseapp.com",
  databaseURL: "https://prototype2-ac61d.firebaseio.com",
  storageBucket: "prototype2-ac61d.appspot.com",
  messagingSenderId: "345262899418"
};
firebase.initializeApp(config);

app.use('/', index);
app.use('/users', users);
app.use('/signin',signin);
app.use('/register',register);
app.use('/dashboard',dashboard);
app.use('/createNew',createNew);
app.use('/mysurveys',mysurveys);
app.use('/surveys',surveys);

/*Ajax requests*/
app.use('/createNewSurvey',createNewSurvey);
app.use('/publishSurvey',publishSurvey);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
