var express=require("express");
var app=express();
var router = express.Router();
var path=require('path');
var db=require('./db.js');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

router.get('/',(req,res)=>{
    let msg;
    let errMsg=req.flash('error');
    if(errMsg) msg=errMsg;
    res.render('join.ejs',{"message":msg});
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

passport.serializeUser((user,done)=>{
    console.log('passport session save : ',user.id);
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    console.log('passport session get id : ',id);
    done(null,id);
});

passport.use('local-join',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    const query=db.query('select * from user where email=?',[email],(err,rows)=>{
        if(err) throw err;

        if(rows.length){
            console.log("existed user");
            return done(null,false,{message:"your email is already used"});
        }else{
            const sql={email:email,pw:password};
            const query=db.query('insert into user set ?',sql,(err,rows)=>{
                if(err) throw err;
                return done(null,{"email":email,"id":rows.insertId});
            });
        }
    });
}));

router.post('/',passport.authenticate('local-join',{
    successRedirect:'/main',
    failureRedirect:'/join',
    failureFlash:true
}));

module.exports =router;