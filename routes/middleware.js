const express=require("express");
const app=express();
app.get("/",(req,res)=>{
    console.log('Get Request for the Login Page');
    res.send("Home Page");
    
})
app.get("/users", auth ,(req,res)=>{
    res.send("Users Page");    
})
function logger(req,res,next){
    console.log('logg');
    next()
}
function auth(req,res,next){
    console.log('Auth');
    next() 
    
}
app.listen(3001,()=>console.log('server started'));