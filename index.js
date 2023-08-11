const express = require("express");

const app = express();

app.use("/blogs/:blogid/users/:username",function(req,res){    //en ozel route en yukarda
    console.log(req.params.blogid)
    console.log(req.params.username)
    res.send("detail of blog")  
});

app.use("/blogs",function(req,res){    
    res.send("blogs list")  
});

app.use("/",function(req,res){    
    res.send("homepage")  
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});