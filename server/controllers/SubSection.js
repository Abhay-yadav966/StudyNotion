
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();


// create subsection
exports.createSubSection = async (req, res) => {
    try{
        // fetch data from req.
        const {sectionId, title, description} = req.body;

        // fetch video
        const video = req.files.videoFile;

        // validation
        if( !sectionId || !title || !description || !video ){
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

        // return responce
        return res.status(200).json({
            success:true,
            message:"SubSection Created Successfully",
            updatedSection,
        });

    }
    catch(err){
        console.log(err);
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
        const {subSectionId, title, description} = req.body;
        // fetch video 
        const video = req.files.videoFile;

        // validation
        if(!subSectionId || !title || !description || !video){
            return res.status(404).json({
                success:false,
                message:"ALL fields are required",
            })
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // update subsection
        const updatedSubSection = await  SubSection.findByIdAndUpdate(
                                        {_id:subSectionId},
                                        {                                        
                                            title:title,
                                            timeDuration:`${uploadDetails.duration}`,
                                            description:description,
                                            videoUrl:uploadDetails.secure_url,    
                                        },
                                        {new:true},
        );


        // return response
        return res.status(200).json({ 
            success:true,
            message:"Subsection updated Successfully",
        });

    }
    catch(err){
        console.log(err);
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
        const{subSectionId, sectionId} = req.body;

        // validation
        if(!subSectionId || !sectionId){
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

        // return response
        return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in deleting Subsection",
        });
    }
} 