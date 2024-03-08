const express = require("express");
const router = express.Router();

// importing controllers 
const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDasboard} = require("../controllers/Profile");

// importing middleware
const {auth, isInstructor} = require("../middlewares/auth");

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

// get instructor dashboard details
router.get("/instructorDasboard", auth, isInstructor, instructorDasboard);
 
module.exports = router; 