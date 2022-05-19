require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");


const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());

//database
const db = process.env.DATABASE

mongoose.connect(db);


// view engine
app.set('view engine', 'ejs');


// routes
app.use("/",  require("./routes/authRoute"));



// port
const port = process.env.PORT
app.listen(port, function(){
  console.log("success")
});