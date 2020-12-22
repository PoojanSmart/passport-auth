const express = require("express");
const bodyPaser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const itializePassport = require("./passport-config");

const app = express();
itializePassport(passport ,(name)=>{return users[name]});
users = {}

app.set("view engine","pug")
app.use(bodyPaser.urlencoded({extended:true}))
app.use(session({
    secret: "ABC123",
    saveUninitialized : false,
    resave :false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", isAuthenticated ,function(req,res){
    res.render("home",{ name : req.user.uname});   
});
app.get("/login", isNotAuthenticated ,function(req,res){
    res.render("login");   
});
app.post("/login",passport.authenticate('local',{
    successRedirect : "/",
    failureRedirect : "/login" 
}));
app.get("/register", isNotAuthenticated , function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){

    if(req.body.pass == req.body.cpass){
        var user = {
            uname : req.body.uname,
            password : req.body.pass
        };
        users[user.uname] = user;
        res.redirect("/login");   
    }
    res.redirect("/register");
});
app.listen(5000);

function isAuthenticated(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/login");
}

function isNotAuthenticated (req,res,next)
    {
        if(req.isAuthenticated())
        {return res.redirect("/");}
        return next();
    }