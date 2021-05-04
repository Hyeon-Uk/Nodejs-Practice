const express=require('express');
const http=require('http');
const path=require('path');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const expressSession=require('express-session');
const app=express();
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

const router=express.Router();
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', router);
router.route('/').get((req,res)=>{
    res.sendFile(path.join(__dirname,'/public/login.html'));
});
router.route('/process/main').get((req,res)=>{
    if(req.session.user){
        res.redirect('/public/main.html');
    }else{
        res.redirect('/public/login.html');
    }
});
router.route('/process/login').post((req,res)=>{
    const paramId=req.body.id||req.query.id;
    const paramPw=req.body.password||req.query.password;

    if(req.session.user){
        console.log("already login");
        res.redirect('/public/main.html');
    }else{
        req.session.user={
            id:paramId,
            name:'hyeon uk',
            authorized:true
        };
        res.writeHead('200',{
            'Content-Type':'text/html;charset=utf8'
        });
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param ID: ' + paramId + '</p></div>');
        res.write('<div><p>Param PW: ' + paramPw + '</p></div>');
        res.write("<br><a href='/process/main'>상품 페이지로 이동</a>");
        res.end();
    }
});

router.route('/process/logout').get(function(req, res){
    if(req.session.user){
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/public/login.html');
        });
    }
    else{
        res.redirect('/public/login.html');
    }
});

http.createServer(app).listen(3000, function () {
});