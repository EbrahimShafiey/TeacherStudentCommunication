const express = require('express');
const app=express();
const mysql=require('mysql');
const hbs=require('hbs');
const bodyParser = require('body-parser');
const bcrypt = require ('bcryptjs');
var session = require('express-session');
var fs = require('fs');
let login=false;

let connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'login'

});

app.use((req,res,next)=>{
    let time= new Date().toString();
    next();
});

app.use(express.static ('public'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.set('view engine','hbs');
hbs.registerPartials('views/partials');


app.get('/',(req,res)=>{

    res.render('home',{
        title: 'login Page',
        des: 'Login',
        
    });
});

    
app.post('/auth',(req,res)=>{
    var username=req.body.user;
    var password=req.body.pass;
    if(req.body.rule=="1"){
    connection.query('select password from student where username=?',[username], (err,result,field)=>{
        bcrypt.compare(password,result[0].password,(err,resa)=>{
        if(resa){
        req.session.loggedin=true
        req.session.username=req.body.user;
        res.redirect('/student');
       res.end();
        }
        else{
        res.send('username or password is incorrect');
        res.end();
        }
    })
    });
    }
    if(req.body.rule=="2"){
        connection.query('select * from teacher where username=? and password=?',[username,password], (err,result,field)=>{
            if(result.length>0){
            req.session.loggedin=true
            req.session.username=req.body.user;
            res.redirect('/teacher');
           res.end();
            }
            else{
            res.send('username or password is incorrect');
            res.end();
            }
        });
    }
});

app.post('/signup',(req,res)=>{
    if(req.body.passu==req.body.passuc){
    var username=req.body.useru;
    var password=req.body.passu;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
    if(req.body.rule=="1"){
        connection.query("insert into student (username, password) VALUES (?,?)",[username,hash], (err,result)=>{
            res.send('register seccussfuly');
            res.end();
        });
    }
    if(req.body.rule=="2"){
        connection.query("insert into teacher (username, password) VALUES (?,?)",[username,hash], (err,result)=>{
            res.send('register seccussfuly');
            res.end();
        });
}
});
});
    }
    else{
            res.send('confirm password is not same');
    }
});


app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/teacher',(req,res)=>{
    if(req.session.loggedin==true){
        res.send('welcome '+req.session.username);
    }
    else{
        res.redirect('/');
    }
});

app.get('/student',(req,res)=>{
    if(req.session.loggedin==true){
        
        res.render('student',{
            pic: 'C:/Users/Mohammad Jadidi/Desktop/reCycle555.jpg'
            
            
        });
    }
    else{
        res.redirect('/');
    }
});

app.listen(80,() =>{
    console.log('app is running...')
});