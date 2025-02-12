const express=require('express');
const home=express.Router();
home.get("/",(req,res)=>{
    console.log('home page');
    res.send("This is the home page!");
    
})
module.exports=home;  