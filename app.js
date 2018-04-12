var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require("express-session");
var MongoStore=require('connect-mongo')(session);
var db = require('./config/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	resave: false, 
  saveUninitialized: true,
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

/**
app.use(session({
	resave: false, 
  saveUninitialized: true,
  secret:"myzhibie",
  store:new MongoStore({
  mongooseConnection:db.dbCon
  })
}));
*/

app.use(function(req,res,next){
//  res.locals.user=req.session.user;
  var err=req.session.error;
  var success=req.session.success;
  var user=req.session.user;
  var mess=req.session.message;
  delete req.session.success;
  delete req.session.error;
  delete req.session.message;
  if(err){
    res.locals.message="*"+err;
  }
  if(mess){
    res.locals.message="*"+mess;
  }
  if(success){
    res.locals.success=success;
  }
  if(user){
    res.locals.user=user.username;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

*/

module.exports = app;
