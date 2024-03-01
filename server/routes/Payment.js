const express = require("express");
const router = express.Router();

// import controller
const {capturePayment, verifyPayment, sendPaymentSuccessEmail} = require("../controllers/Payment");

// import middleware
const {auth, isStudent} = require("../middlewares/auth");

// routes

// capturePayment
router.post("/capturePayment", auth, isStudent, capturePayment);

// verify Payment
router.post("/verifyPayment", auth, isStudent, verifyPayment);

// send payment successfully
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;