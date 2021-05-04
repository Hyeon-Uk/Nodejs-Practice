var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var cors=require("cors");
var router=require('./router/index');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var session=require('express-session');
var flash=require('connect-flash');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(cors());
app.listen(3000,()=>{
});
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);