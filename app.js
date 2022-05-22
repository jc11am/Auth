require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const {middle, checkuser } = require("./middleware/middleware");


const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieparser());

//database
const db = process.env.DATABASE

mongoose.connect(db);


// view engine
app.set('view engine', 'ejs');


// routes
app.get("*", checkuser);
app.use("/",  require("./routes/authRoute"));
app.get("/smoothies", middle , function(req, res){
  res.render("smoothies")
});



// port
const port = process.env.PORT
app.listen(port, function(){
  console.log("success")
});