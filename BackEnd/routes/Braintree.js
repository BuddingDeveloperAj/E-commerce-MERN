const express = require("express");
const router = express.Router();
const {getToken, processPayment} = require("../controllers/Braintree")

const {isSignedIn, isAuthenticated} = require("../controllers/auth")

router.get("/payment/braintree/gettoken/:userId", isSignedIn, isAuthenticated, getToken)


router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, getToken, processPayment)


module.exports = router;