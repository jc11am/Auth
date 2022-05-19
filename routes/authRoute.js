 const express = require("express");
 const router = express.Router(); 
 const render = require("../controller/controller");


 //routes
router.get("/", render.home);
router.get("/smoothies", render.smoothies);
//routes
router.get("/login", render.login);

router.post("/login",render.login_post);

router.get("/register", render.register);

router.post("/register",render.register_post );


module.exports = router;