require('dotenv').config()
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const passport = require('passport');
const logger = require('morgan');
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./src/routes')
// 引用資料庫連線方法
const db = require('./src/middlewares/database/mongodb-connection')

//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// 設定每一筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'))
//
app.use(logger('dev'));

//
app.use(session({
  secret: 'foo',
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  resave: false,
  name: 'discord-oauth2',
  store: MongoStore.create({
    client: db.getClient()
  })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Express
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

// 將 request 導入路由器
app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;