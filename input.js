const fs=require('fs');
fs.readFile("input.txt",function(err,data){
    if(err){
        console.log('Errror occured'); 
    }
    console.log("Asynchronous read: " + data.toString());
    
});

// const fs = require("fs");

// Synchronous read
const data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());


fs.open("input.txt","r+",function(err,fd){
    if(err){
        console.log(err);
        
    }
    else{
        console.log('File opened successfully1');
        
    }
})


console.log('-----------------------------------------------------');
console.log('content before doing changes in files');
fs.readFile("input.txt",function(err,data){
    if(err){
        console.log(err);
        
    }
    else{
        console.log(data.toString());
        
    }
})

console.log('-----------------------------------------------------');
console.log('Now after writing something in the file');

fs.writeFile("input.txt","This are new changes from Devang Mestry!!!",function(err){
    if(err){
        console.log('This is the error!');
        
    }
    console.log('lets read the new data');
    fs.readFile("input.txt",function(err,data){
        if(err){
            console.log('err');
            
        }
        console.log(data.toString());
        
    });
    
})

fs.unlink("input.txt",function(err){
    console.log('deleting file');
    if(err){
        console.log('err');
        

    }
    console.log('Deleted succcessfully');
    
    
})

