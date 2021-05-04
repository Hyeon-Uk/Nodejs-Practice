var express=require("express");
var app=express();
var router = express.Router();
var path=require('path');
var db=require('./db.js');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

router.get('/',(req,res)=>{
    res.render('join.ejs');
});

// router.post('/',(req,res)=>{
//     const body=req.body;
//     const email=body.email;
//     const name=body.name;
//     const passwd=body.password;
//     db.query('insert into user(email,name,pw) values(?,?,?);',[email,name,passwd],(err,rows)=>{
//         if(err) throw err;
//         res.render('welcome.ejs',{'name':name,'id':rows.insertId});
//     });
// });

passport.use('local-join',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    console.log('local-join callback called');
}));


module.exports =router;