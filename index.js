const express = require("express");

const app = express();

app.set("view engine", "ejs");

const mysql = require("mysql2");
const config = require("./config");

let connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if(err){
        return console.log(err);
    }

    connection.query("select * from blog", function(err, result){
        console.log(result);
        console.log(result[0]);
        console.log(result[0].title);
    });

    console.log("connected to mysql");
});


const path = require("path");
const userRoutes = require("./routes/user");   //middleware
const adminRoutes = require("./routes/admin");

app.use("/libs",express.static(path.join(__dirname,'node_modules')));
app.use("/static",express.static(path.join(__dirname,'public')));

app.use("/admin",adminRoutes);   //daha özel daha yukarıda
app.use(userRoutes);

app.listen(3000, function(){
    console.log("Listening on port 3000")
});