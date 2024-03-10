const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


// create subsection
exports.createSubSection = async (req, res) => {
    try{
        // fetch data from req.
        const {courseId , sectionId, title, description} = req.body;

        // fetch video
        const video = req.files.video;


        // validation
        if( !courseId || !sectionId || !title || !description || !video ){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // create Subsection
        const newSubSection = await SubSection.create({
                                    
                                    title:title,
                                    timeDuration:`${uploadDetails.duration}`,
                                    description:description,
                                    videoUrl:uploadDetails.secure_url,
        });


        // update section by inserting subsection id in it
        const updatedSection = await Section.findByIdAndUpdate(
                                        { _id:sectionId },
                                        {
                                            $push:{
                                                subSection:newSubSection._id,
                                            }
                                        },
                                        {new:true},
        ).populate("subSection").exec();


        // fetching course details for sending it in responce
        const courseDetails = await Course.findById({
                                                        _id:courseId,
                                                    }).populate(
                                                        {
                                                            path:"courseContent",
                                                            populate:{
                                                                path:"subSection",
                                                            }
                                                        }
                                                    ).exec();

        // return responce
        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
            courseDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to create Subsection, Please try again",
        });
    }
}


// Update SubSection

exports.updateSubSection = async (req, res) => {
    try{
        // fetch data from req.
        const {subSectionId, title, description, courseId} = req.body;
        
        const subSectionDetails = await SubSection.findById({_id:subSectionId});
 
        // checking for title
        if( title !== undefined ){
            subSectionDetails.title = title;
        }

        // checking for description
        if( description !== undefined ){
            subSectionDetails.description = description;
        }

        // checking for video
        if( req.files && req.files.video ){

            // fetch video 
            const video = req.files.video;

            const videoUpdateCloudinary = await uploadImageToCloudinary( video, process.env.FOLDER_NAME);

            subSectionDetails.videoUrl = videoUpdateCloudinary.secure_url;
            subSectionDetails.timeDuration = `${videoUpdateCloudinary.duration}`
        }

        await subSectionDetails.save();

        // fetching course details 
        const courseDetails = await Course.findById({_id:courseId}).populate({
                                                                                path:"courseContent",
                                                                                populate:{
                                                                                    path:"subSection",
                                                                                }
                                                                            }).exec()

        // return response
        return res.status(200).json({
            success:true,
            message:"subSection Updated SuccessFully",
            courseDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Update Subsection, Please try again",
        });
    }
}


// delete Subsection
exports.deleteSubSection = async (req, res) => {
    try{
        // fetch data from req.
        const{subSectionId, sectionId, courseId} = req.body;

        // validation
        if(!subSectionId || !sectionId || !courseId){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }

        // delete subsection
        const subSectionDelete = await SubSection.findByIdAndDelete({_id:subSectionId});

        // update section
        const updatedSection = await Section.findByIdAndUpdate(
                                    {_id:sectionId},
                                    {
                                        $pull:{
                                            subSection:subSectionId,
                                        }
                                    },
                                    {new:true},
        );

        // fetching course details
        const courseDetails = await Course.findById({_id:courseId}).populate({
                                                                                path:"courseContent",
                                                                                populate:{
                                                                                    path:"subSection",
                                                                                }
        }).exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            courseDetails,
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in deleting Subsection",
        });
    }
}  