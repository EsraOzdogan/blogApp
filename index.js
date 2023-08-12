const express = require("express");

const app = express();

const path = require("path");
const userRoutes = require("./routes/user");   //middleware
const adminRoutes = require("./routes/admin");

app.use("/libs",express.static(path.join(__dirname,'node_modules')));
app.use("/static",express.static(path.join(__dirname,'public')));

app.use("admin",adminRoutes);   //daha özel daha yukarıda
app.use(userRoutes);

app.listen(3000, function(){
    console.log("Listening on port 3000")
});