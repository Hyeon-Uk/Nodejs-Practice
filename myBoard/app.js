const express=require('express');
const app=express();
const router=require('./routes/index');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(router);
app.set('view engine','ejs');
app.set('views',"./views");
app.listen(8000,()=>{
    console.log("server start!");
})