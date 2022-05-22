 const express = require("express");
 const router = express.Router(); 
 const render = require("../controller/controller");
const { middle } = require("../middleware/middleware");


 //routes
router.get("/", render.home);

//routes
router.get("/login", render.login);

router.post("/login", render.login_post);

router.get("/register", render.register);

router.post("/register",render.register_post );

router.get("/logout", render.logout);


module.exports = router;