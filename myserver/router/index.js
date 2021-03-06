var express=require("express");
var app=express();
var router = express.Router();
var path=require('path');
var main=require('./main');
var email=require('./email');
var join=require('./join');
var login=require('./login');
var logout=require('./logout');
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/main.html"));
});

router.use('/main',main);
router.use('/email',email);
router.use('/join',join);
router.use('/login',login);
router.use('/logout',logout);
module.exports =router;