const express = require("express");
const router = express.Router();

// importing controllers 
const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} = require("../controllers/Profile");

// importing middleware
const {auth} = require("../middlewares/auth");

// routes

// deleteAccount
router.delete("/deleteProfile", auth, deleteAccount);

// update profile
router.put("/updateProfile", auth, updateProfile);

// get All user details
router.get("/getUserDetails",auth, getAllUserDetails);

// get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// update display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router; 