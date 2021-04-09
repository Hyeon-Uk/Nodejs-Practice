const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');

const FILEPATH='./todo_list.json';

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'));
})

router.post('/add',(req,res)=>{
    fs.readFile(FILEPATH,{"encoding":'utf-8'},(err,data)=>{
        if(err) throw err;
        data=JSON.parse(data);
        data.list.push({"content":req.body.value,"complete":req.body.complete,'deadline':req.body.deadline});
        fs.writeFile(FILEPATH,JSON.stringify(data),(err)=>{
            if(err) throw err;
            res.json(true);
        })
    })
})

router.post('/clear',(req,res)=>{
    fs.readFile(FILEPATH,{'encoding':"utf-8"},(err,data)=>{
        if(err) throw err;
        const targetId=req.body.id;
        data=JSON.parse(data);
        data.list[targetId-1].complete=!data.list[targetId-1].complete;
        fs.writeFile(FILEPATH,JSON.stringify(data),err=>{
            if(err) throw err;
            res.json(true);
        })
    });
});

router.post('/delete',(req,res)=>{
    fs.readFile(FILEPATH,{"encoding":"utf-8"},(err,data)=>{
        if(err) throw err;
        const targetId=req.body.id;
        data=JSON.parse(data);
        data.list[targetId-1]=null;
        data.list=data.list.filter(Boolean);
        fs.writeFile(FILEPATH,JSON.stringify(data),err=>{
            if(err) throw err;
            res.json(true);
        })
    })
})

router.get('/list',(req,res)=>{
    fs.readFile(FILEPATH,{"encoding":'utf-8'},(err,data)=>{
        if(err) throw err;
        res.json(JSON.parse(data));
    })
})


module.exports = router;