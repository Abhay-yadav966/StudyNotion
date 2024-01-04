const express = require("express");
const router = express.Router();

// impoting controllers
const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course");

// importing category controller
const {createCategory, getAllCategories, categoryPageDetails} = require("../controllers/Category");

// impoting rating and review controller
const {createRatingAndReviews, getAverageRating, allRatingReview} = require("../controllers/RatingAndReview");

// impoting section controller
const {createSection, updateSection, deleteSection} = require("../controllers/Section");

// impoting Subsection controller
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");

// importing middleware
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");


// routes

                                                // course routes

// create course - course can only be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);

// getAllCourses
router.get("/getAllCourses", getAllCourses);

// getCourseDetails
router.post("/getCourseDetails", getCourseDetails);

// section routes
// createSection 
router.post("/addSection", auth, isInstructor, createSection);

// updateSection
router.post("/updateSection", auth, isInstructor, updateSection);

// deleteSection
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Subsection routes
// createSubSection
router.post("/addSubSection", auth, isInstructor, createSubSection);

// updateSubSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// deleteSubSection
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


                                                // category routes 

// create category - this can be managed only by Admin
router.post("/createCategory", auth, isAdmin, createCategory);

// getAllCategories
router.get("/showAllCategories", getAllCategories);

// categoryPageDetails
router.post("/getCategoryPageDetails", categoryPageDetails);


                                            // Rating and reviews routes

// createRatingAndReviews
router.post("/createRating", auth, isStudent, createRatingAndReviews);

// getAverageRating
router.post("/getAverageRating", getAverageRating);

// allRatingReview
router.get("/getReviews", allRatingReview); 


module.exports = router; 
  