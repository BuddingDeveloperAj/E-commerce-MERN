var express = require("express");
var router = express.Router();
const {signout, signup, signin, isSignedIn} = require("../controllers/auth.js")
const {body, validationResult} = require("express-validator");



router.post("/signup",[
    body("name", "Must be atleast 3 chars long").isLength({min:3}),
    body("email", "Email is required").isEmail(),
    body("password", "password should be atleast 6 char").isLength({min:6})
], signup);


router.get("/signout", signout);


router.post("/signin", [
    body("email", "Email is required").isEmail(),
    body("password", "password fiield is required").isLength({min:6})
], signin);



module.exports = router;