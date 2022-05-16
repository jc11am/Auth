const AUser = require("../model/user");

// handle errors
const handle = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //duplicate error
    if(err.code === 11000) {
        errors.email = "this email is already registered";
        return errors;
    }
  
    // validation errors
    if (err.message.includes('AUser validation failed')) {
        Object.values(err.errors).forEach(function({properties}){
            errors[properties.path] = properties.message;
    })
    }
    return errors;
  }


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

exports.register_post = async function(req, res){ 
    const { email, password } = req.body
    try{
        const user = await AUser.create({ email, password })
        res.status(201).json(user);
    }
    catch(err){
        const errors = handle(err);
        res.status(400).json({ errors })
    }
}
;

exports.logout = (function(req, res){
    res.render("/")
});