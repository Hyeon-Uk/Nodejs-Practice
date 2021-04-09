const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const router=require('./routes/index');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())
app.listen(8000,()=>{
});

app.use(router);