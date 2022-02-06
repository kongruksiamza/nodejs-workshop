var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Connect DB
var mongodb=require('mongodb');
var db=require('monk')('localhost:27017/ProjectDB');

//Upload
var multer=require('multer');
var upload=multer({dest:'./public/images'});

//Define Router
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.descriptionText=function(text,length){
    return text.substring(0,length);
}

app.use('/', indexRouter);
app.use('/admin', adminRouter);


module.exports = app;
