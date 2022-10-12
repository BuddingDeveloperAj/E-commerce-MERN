const express = require("express");
const router = express.Router();
const {getToken, processPayment} = require("../controllers/Braintree")
const {getUserById} = require("../controllers/user")
const {isSignedIn, isAuthenticated} = require("../controllers/auth")

router.param("userId", getUserById);
router.get("/payment/braintree/gettoken/:userId", isSignedIn, isAuthenticated, getToken)
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated,  processPayment)

module.exports = router;