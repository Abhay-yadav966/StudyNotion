
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

// create course
exports.createCourse = async (req, res) => {
    try{

        // fetch data from req
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category} = req.body;

        // fetch image
        const thumbnail = req.files.thumbnailImage;

        // validation
        if( !courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        console.log("Instructor Details", instructorDetails);

        if( !instructorDetails ){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not Found",
            });
        }

        // check Category is valid or not
        const categoryDetails = await Category.findById(category);

        if( !categoryDetails ){
            return res.status(404).json({
                success:false,
                message:"Tag Details Not Found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary( thumbnail, process.env.FOLDER_NAME );

        // create entry in DB for course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
        });


        // add the new course to the user schema for instructor
        await User.findByIdAndUpdate(
                {_id:instructorDetails._id},
                {
                    $push:{
                        courses:newCourse._id,
                    }
                },
                {new:true},
            );


        // update category ka schema 
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push:{
                    course:newCourse._id,
                }
            },
            {new:true},
        )

        // return res

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while creating course",
        });
    }
}


// getAllCourses
exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({});

        // return responce
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched Successfully",
            data:allCourses,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while getting all course",
        });
    }
}


// getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{
        // fetch data 
        const {courseId} = req.body;

        // find course details
        const courseDetails = await Course.findById({_id:courseId})
                                    .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionDetails",
                                            },
                                        }
                                    )
                                    .populate(
                                        {
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .exec();

        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Course Details not found",
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            courseDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in fetching course details",
        });
    }
}