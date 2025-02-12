const express=require("express");
const routess=express.Router();

routess.get("/",(req,res)=>{
    res.send("New Routee!!");

})
module.exports = routess;
