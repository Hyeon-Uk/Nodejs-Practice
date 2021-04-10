const express=require('express');
const router=express.Router();
const fs=require('fs');
const FILEPATH="./person.json";

let isLogin=false;
let personInfo;
router.get('/',(req,res)=>{
    console.log(personInfo);
    if(!isLogin){
        res.render('login');
    }
    else{
        res.render('index');
    }
})


//로그인
router.post('/login',(req,res)=>{
    const data=req.body;
    fs.readFile(FILEPATH,{"encoding":"utf-8"},(err,people)=>{
        if(err) throw err;
        people=JSON.parse(people);
        people.person.forEach(each=>{
            if(each.id==data.id&&each.pass==data.pass){
                isLogin=true;
                personInfo=each;
            }
        });
        res.redirect("/");
    })
})


//로그아웃
router.post('/logout',(req,res)=>{
    isLogin=false;
    personInfo=null;
    res.redirect('/');
})


router.post('/make',(req,res)=>{
    const text=req.body.text;
    console.log(personInfo);
    fs.readFile(FILEPATH,{"encoding":"utf-8"},(err,data)=>{
        if(err) throw err;
        data=JSON.parse(data);
        const sendData={
            name:personInfo.name,
            text:text
        };
        data.article.push(sendData);
        fs.writeFile(FILEPATH,JSON.stringify(data),err=>{
            if(err) throw err;
            res.json(sendData);
        })
    })
})

router.post('/load',(req,res)=>{
    fs.readFile(FILEPATH,{'encoding':'utf-8'},(err,data)=>{
        if(err) throw err;
        data=JSON.parse(data);
        data=data.article;
        res.json(data);
    })
})
module.exports=router;