const express = require("express");
const router = express.Router();

// import controller
const {capturePayment, verifySignature} = require("../controllers/Payment");

// import middleware
const {auth, isStudent} = require("../middlewares/auth");

// routes

// capturePayment
router.post("/capturePayment", auth, isStudent, capturePayment);

// verify Payment
router.post("/verifySignature", verifySignature);

module.exports = router;