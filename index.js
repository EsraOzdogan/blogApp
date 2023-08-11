const express = require("express");

const app = express();

app.use(function(req,res,next){           //gelen her sorguda 'hello world yazisi getirilir
    console.log("middleware 1")
    next();  //süreci devam ettir
});

app.use(function(req,res,next){          
    console.log("middleware 2") 
    next();
});

app.use(function(req,res){          
    console.log("middleware 3") 
    //res.end();   //bitir
    res.send("<h1>homepage</h1>")
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});