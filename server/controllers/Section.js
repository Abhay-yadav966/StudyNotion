const Section = require("../models/Section");
const Course = require("../models/Course");



// create section
exports.createSection = async (req, res) => {
    try{

        // fetch data from req
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }

        // create section in DB
        const newSection = await Section.create({sectionName:sectionName});

        // update course with section objectId
        const updatedCourse = await Course.findByIdAndUpdate(
                                            {_id:courseId},
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {new:true},
        ).populate("courseContent").exec();

        // return res
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourse,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to create section, please try again",
        });
    }
}

// update section
exports.updateSection = async (req, res) => { 
    try{
        // fetch data from req.
        const {sectionName, sectionId, courseId} = req.body;

        // validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }

        // section ko update
        const section = await Section.findByIdAndUpdate(
                                            {_id:sectionId},
                                            {
                                                sectionName:sectionName,
                                            },
                                            {new:true},
        );

        // now fetching course details for response
        const courseDetails = await Course.findById({_id:courseId}).populate("courseContent");

        // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            courseDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to update section, Please try again",
        });
    }
}

// delete Section
exports.deleteSection = async (req, res) => {
    try{
    
        // fetch data from params
        const {sectionId, courseId} = req.body; 


        // delete section
        const SectionDetails = await Section.findByIdAndDelete({_id:sectionId});

        // update course with sectionid
        const courseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $pull:{
                    courseContent:sectionId,
                }
            },
            {new:true}, 
        ).populate("courseContent");;

        // return res
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            courseDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Delete section, Please try again",
        });
    }
}  