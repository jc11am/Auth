const passport = require("passport");
const User = require("../model/user");



exports.home = (function(req, res){
    res.render("home")
});

exports.smoothies = (function(req, res){
    res.render("smoothies")
});

exports.login = (function(req, res){
    res.render("login")
});

exports.login_post = async (req, res) => {

};

exports.register = (function(req, res){
    res.render("register")
});

exports.register_post = (function(req, res){ 

});

exports.logout = (function(req, res){
    res.render("/")
});