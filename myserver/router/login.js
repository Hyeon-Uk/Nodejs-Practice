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
    res.render('login.ejs',{"message":msg});
});

passport.serializeUser((user,done)=>{
    console.log('passport session save : ',user.id);
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    console.log('passport session get id : ',id);
    done(null,id);
});

passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    const query=db.query('select * from user where email=?',[email],(err,rows)=>{
        if(err) done(err);

        if(rows.length){
            return done(null,{"email":email,"id":rows[0].uid});
        }else{
            return done(null,false,{'message':'your login info is not found'});
        }
    });
}));

router.post('/',(req,res,next)=>{
    passport.authenticate('local-login',(err,user,info)=>{
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.logIn(user,(err)=>{
            if(err) return next(err);
            return res.json(user);
        });
    })(req,res.next);
});

module.exports =router;