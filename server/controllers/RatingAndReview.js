
const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReview");
// const {ObjectId} = mongoose; 


// create Rating and reviews
exports.createRatingAndReviews = async (req, res) => {
    try{
        // fetching user id
        const userId = req.user.id;
        // fetching data from request
        const {courseId, rating, review} = req.body;

        // check user is enrolled in course or not
        const courseDetails = await Course.findById({_id:courseId});
        
        if(!courseDetails){
            return res.json({
                success:false,
                message:"Unable to fetched Course Details",
            });
        }
 
        const uid = new mongoose.Types.ObjectId(userId); 
        
        if(courseDetails.studentEnrolled.includes(userId)){

            // check user already reviewed the course
            const alreadyReviewed = await RatingAndReviews.findOne({
                                                user: userId,
                                                course: courseId,
            });

           

            if(alreadyReviewed){
                return res.status(403).json({
                    success:false,
                    message:"User already Reviewed",
                });
            } 

            // create review and rating
            const ratingReview = await RatingAndReviews.create({
                                        user:userId,
                                        rating:rating,
                                        review:review,
                                        course:courseId,
            });


            // update course with rating and review
            const updateCourse = await Course.findByIdAndUpdate(
                                                {_id:courseId},
                                                {
                                                    $push:{
                                                        ratingAndReviews:ratingReview._id,
                                                    }
                                                },
                                                {new:true},
            )

            // return response
            return res.status(200).json({
                success:true,
                message:"Rating and review created successfully",
            });
        }


    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in creating rating and review",
        });
    }
} 

// get Average rating
exports.getAverageRating = async (req, res) => {
    try{
        // fetch data 
        const {courseId} = req.body;

        // calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ]);

        // return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }


        // if rating does not exists
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, now rating given till now",
            averageRating:0,
        });

    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in GetAverage Rating",
        });
    }
}

// get AllRatingReview
exports.allRatingReview = async (req, res) => {
    try{
        const allRatingReview = await RatingAndReviews.find({})
                                        .populate(
                                            {
                                                path:"user",
                                                select:"firstName lastName email image",
                                            }
                                        )
                                        .populate({
                                            path:"course",
                                            select:"courseName"
                                        })
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"All rating and reviews fetched successfully",
            allRatingReview,
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in Get All Rating and Review Rating",
        });
    }
}