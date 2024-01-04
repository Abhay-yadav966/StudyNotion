const express = require("express");
const router = express.Router();

// importing the required controller and middleware function

const { logIn, signUp, sendOTP, changePassword } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

// middleware
const {auth} = require("../middlewares/auth");




// routes

// login
router.post("/login", logIn);

// signup
router.post("/signup",signUp);

// sendotp
router.post("/sendotp", sendOTP);

// change password
router.post("/changepassword", auth, changePassword);


//routes for reset password 

// reset password token
router.post("/reset-password-token",resetPasswordToken);

// reset password
router.post("/reset-password",resetPassword);

// export router
module.exports = router;