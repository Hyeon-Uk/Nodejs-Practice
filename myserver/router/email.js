var express=require("express");
var app=express();
var router = express.Router();
var path=require('path');
var mysql=require('mysql');
var db=require('./db.js');

router.post('/form',(req,res)=>{
    res.render("email.ejs",{"email":req.body.email});
});

router.post("/ajax",(req,res)=>{
    const email=req.body.email;
    const responseData={};
    const query=db.query(`select name from user where email='${email}'`,(err,rows)=>{
        if(err){
            throw err;
        }    
        if(rows[0]){
            responseData.result="ok";
            responseData.name=rows[0].name;
        }else{
            responseData.result="none";
            responseData.name="";
        }
        res.json(responseData);        
    });
});

module.exports=router;