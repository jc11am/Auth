const jwt = require('jsonwebtoken');
const AUser = require('../model/user');

const secret = process.env.SECRET; 

const middle = function(req, res, next) {
  const token = req.cookies.jwt;

  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, secret, function(err, decodedToken) {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkuser = function(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async function(err, decodedToken) {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next()
      } else {
        console.log(decodedToken);
        let user = await AUser.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
  }


module.exports = { middle, checkuser };