require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var volunteerRouter = require('./routes/volunteers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose
  .connect(
     process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false },
  )
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch(console.log('DB NOT CONNECTED'));

app.get("/test",(req,res)=>{
    res.json({'msg':'Testing...'});
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/volunteers',volunteerRouter);

module.exports = app;
