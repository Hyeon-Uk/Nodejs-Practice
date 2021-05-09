var express=require("express");
var app=express();
var router = express.Router();
var path=require('path');

router.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,"../public/main.html"));
    console.log("main.js loaded",req.user);
    const id=req.user;
    res.render('main.ejs',{"id":id});
});

module.exports = router;
