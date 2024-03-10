
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const {convertSecondsToDuration} = require("../utils/secToDuration");
require("dotenv").config();

// create course
exports.createCourse = async (req, res) => {
    try{

        // fetch data from req
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions} = req.body;

        // fetch image
        const thumbnail = req.files.thumbnail;

        // validation
        if( !courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category || !instructions){
            return res.status(400).json({
                success:false,
                message:"All fields are required",

            });
        }

        // checking status
        if( !status || status === undefined ){
            status = "Drafted"
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

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
            instructions,
            price,
            tag:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status,
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

        // populating course details
        const courseDetails = await Course.findById({_id:newCourse._id}).populate("category").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).populate({
            path:"instructor",
            populate:{
                path:"additionDetails",
            }
        }).exec();

        // return res

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            courseDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while creating course",
        });
    }
}

// update course
exports.updateCourse = async (req, res) => {
    try{
        // fetching data from request
        const { courseId, courseName, courseDescription, price, tag, whatYouWillLearn, category, instructions, thumbnail, status } = req.body;

        // fetching course details using course id
        const courseDetails = await Course.findById({_id:courseId});

        if( courseName !== undefined ){
            courseDetails.courseName = courseName;
        }

        if( courseDescription !== undefined ){
            courseDetails.courseDescription = courseDescription;
        }

        if( price !== undefined ){
            courseDetails.price = price;
        }

        if( tag !== undefined ){     
            courseDetails.tag = tag;
        }

        if( whatYouWillLearn !== undefined ){
            courseDetails.whatYouWillLearn = whatYouWillLearn;
        }

        if( category !== undefined ){
            courseDetails.category = category;
        }

        if( instructions !== undefined ){
            courseDetails.instructions = instructions;
        }

        if( thumbnail !== undefined ){
            courseDetails.thumbnail = thumbnail;
        }

        if( status !== undefined ){
            courseDetails.status = "Published";
        }

        await courseDetails.save();
        
        const courseDetail = await Course.findById({_id:courseId}).populate({ 
                    path:"courseContent",
                    populate:{
                                path:"subSection",
                            },
        })
        .populate("category") 
        .populate("ratingAndReviews")
        .populate({
            path:"instructor",
            populate:{
                path:"additionDetails",
            }
        }).exec();

        // return responce
        res.status(200).json({
            success:true,
            message:"Course Updated successfully",
            courseDetail,
        });

    }
    catch( error ){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Something went wrong in updating course",
        });
    }
}

// delete course
exports.deleteCourse = async (req, res) => {
    try{
        // fetching data from body
        const {courseId} = req.body;

        // validation
        if( !courseId ){
            return res.status(400).json({
                success:false,
                message:"courseId is absent",
            })
        }

        // check wheather course is present or not
        const course = await Course.findById({_id:courseId});

        if( !course ){
            return res.status(404).json({
                success:false,
                message:"Course not Found",
            });
        }

        // Unenroll students from the course
        course.studentEnrolled.forEach( async (userId) => {
            await User.findByIdAndUpdate({_id:userId},
                                            {
                                                $pull: { courses: courseId}
                                            }, {new:true})
        });

        // delete section and subsections
        course?.courseContent?.forEach( async (sectionId) => {
            // fetching section details by id for deleting subsection as well as for deleting sections
            const section = await Section.findById({_id:sectionId});

            // checking wheather section is present or not
            if(section){
                section?.subSection?.forEach( async (subSectionId) => {
                    await SubSection.findByIdAndDelete({_id:subSectionId});
                } );
            }

            await Section.findByIdAndDelete({_id:sectionId});
        } )


        // delete the course
        await Course.findByIdAndDelete({_id:courseId});

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        });

        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Something went wront in deleting course"
        })
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
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in fetching course details",
        });
    }
}

// fetch all instructor course
exports.getInstructorCourses = async (req, res) => {
    try{

        // fetch data
        const instructorId = req.user.id;

        // validation
        if( !instructorId ){
            return res.status(400).json({
                success:false,
                message:"Instructor id is missing",
            })
        }

        // fetching courses according to instructor
        const courses = await Course.find({instructor:instructorId}).sort({ createdAt: -1 });

        // returning response
        return res.status(200).json({
            success:true,
            message:"All instructor course get successfully",
            courses,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Something went wronge in get Instructor courses",
        });
    }
}

// getFullCourseDetail
exports.getFullCourseDetails = async (req, res) => {
    try{

        // fetching data from request
        const {courseId} = req.body;
        const userId = req.user.id;

        // validation
        if( !courseId || !userId ){
            return res.status(400).json({
                success:false,
                message:"Course Id is absent"
            })
        }

        // fetch course details
        const courseDetails = await Course.findById({_id:courseId}).populate({
                                                                                path:"instructor",
                                                                                populate:{
                                                                                    path:"additionDetails",
                                                                                }
                                                                            })
                                                                            .populate({
                                                                                path:"courseContent",
                                                                                populate:{
                                                                                    path:"subSection",
                                                                                }
                                                                            })
                                                                            .populate("category")
                                                                            .populate("ratingAndReviews")
                                                                            .exec();

        if( !courseDetails ){
            return res.status(400).josn({
                success:false,
                message:"Could not found the course with the courseId"
            })
        }

        // fetching course progress
        let courseProgressCount = await CourseProgress.findOne({courseId : courseId}).populate("completedVideos").exec();

        let totalDurationInSeconds = 0;
        courseDetails?.courseContent?.forEach((section) => {
            section?.subSection?.forEach((subSection) => {
                totalDurationInSeconds =+ parseInt(subSection?.timeDuration);
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        // return res
        return res.status(200).json({
            success:true,
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],
            }
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}