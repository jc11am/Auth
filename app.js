require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
  extended: true
}));


// view engine
app.set('view engine', 'ejs');


// routes
app.use("/",  require("./routes/authRoute"));



// port
const port = process.env.PORT
app.listen(port, function(){
  console.log("success")
});