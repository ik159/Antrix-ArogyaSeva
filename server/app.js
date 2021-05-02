require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webpush = require('web-push');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orgsRouter = require('./routes/org');
var hospitalRouter = require('./routes/hospitals');
var storeRouter = require('./routes/stores');
var volunteerRouter = require('./routes/volunteers');
var postRouter = require('./routes/posts');
//var notificationRouter = require('./webpushdemo');
var notificationRouter =require('./routes/notification');

const cors = require('cors');

var app = express();

//app.use(cors({origin:true,credentials:true}));
app.use(cors());
app.use(express.json({extended:false}));
//app.use(bodyParser.json());
app.use(cors({origin:true,credentials:true}));
app.use(logger('dev'));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orgs',orgsRouter);
app.use('/hospitals',hospitalRouter);
app.use('/stores',storeRouter);
app.use('/volunteers',volunteerRouter);
app.use('/posts',postRouter);
app.use('/notifications',notificationRouter);

module.exports = app;
