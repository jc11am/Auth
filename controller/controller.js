const AUser = require("../model/user");
const jwt = require("jsonwebtoken");

// handle errors
const handle = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //login errors
    if(err.message === "incorrect email") {
        errors.email = "this email does not exist"
    }

    if(err.message === "incorrect password") {
        errors.password = "incorrect password"
    }

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

  //create token
  const maxage = 3 * 24 * 60 * 60;

  const createToken = function(id){
      return jwt.sign({ id }, "who killed kamura", {
          expiresIn: maxage
      })
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

exports.login_post = async  function(req, res) {
    const { email, password } = req.body;

    try {
         
        const user = await AUser.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxage: maxage * 1000 });
        res.status(200).json({ user: user._id })

        
    } catch (err) {
        const errors = handle(err);
        res.status(400).json({ errors })
    }

};

exports.register = (function(req, res){
    res.render("register")
});

exports.register_post = async function(req, res){ 
    const { email, password } = req.body
    try{
        const user = await AUser.create({ email, password })
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxage: maxage * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err){
        const errors = handle(err);
        res.status(400).json({ errors })
    }
};

exports.logout = (function(req, res){
    res.render("/")
});