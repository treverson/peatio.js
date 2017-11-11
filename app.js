const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require("body-parser");

const config = require('./routes/util/configs').config;
const routes = require('./routes/controller');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sessiontest'));
app.use(session({
  secret: 'sessiontest',//与cookieParser中的一致
  resave: true,
  saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, '/assets')));

//login filter
app.use(function(req, res, next){
  let returnUrls = ['','signin'];
  let url = req.originalUrl;
  url = url.slice(1, url.indexOf('?') >= 0 ? url.indexOf('?') : url.length);
  res.locals.location = url;
  res.locals.identity = req.session.identity;
  res.locals.member = req.session.member;
  res.locals.isAdmin = false;
  if(!!res.locals.identity && res.locals.identity.email == config.ADMIN){
    res.locals.isAdmin = true;
  }
  if(returnUrls.indexOf(url) >= 0) {
    next();
  }else if(!req.session.identity){
    req.session.login = 'not';
    res.redirect('/signin');
  }else {
    next();
  }
});

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err)
    console.log('app.js')
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(config.PORT);

console.log(`listen the port: ${config.PORT}`);

module.exports = app;