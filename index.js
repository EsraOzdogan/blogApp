const express = require("express");

const app = express();

app.use(function(req,res){           //gelen her sorguda 'hello world yazisi getirilir
    res.end("hello world")
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});