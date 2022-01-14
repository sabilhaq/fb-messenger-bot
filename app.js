const fs = require('fs');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var webhookRouter = require('./routes/webhook');

var app = express();

// Certificate
const privateKey = fs.readFileSync(process.env.PRIVKEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERT, 'utf8');
const ca = fs.readFileSync(process.env.CHAIN, 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/webhook', webhookRouter);

module.exports = {
  app,
  credentials,
};
