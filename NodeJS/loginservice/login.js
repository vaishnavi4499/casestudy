const express = require('express');
var cors = require('cors');
var createError=require('http-errors');
var cookieParser=require('cookie-parser');




const {mongoose}=require('./dbconnect.js')

const app = express();

app.use(cors({ 
    origin: ['http://localhost:4200','http://127.0.0.1:4200'] ,credentials:true}));

    
//passport 
var passport=require('passport');
var session=require('express-session');

app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    }
}));
require('./passport-config');


app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());    


var UserRouter = require('./routes/users');
var customerroute = require('./routes/customerlogin')
app.use('/', UserRouter);
app.use('/customer', customerroute);


app.listen(4000, () => {
    console.log("up and running -- This is our login service");
});