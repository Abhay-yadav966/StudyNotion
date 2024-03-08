const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {

    try{
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        // validation
        if( !courseId || !subSectionId ){
            return res.status(400).json({
                success:false,
                message:"Id is not sended properly",
            })
        }

        // fetching subSection Details 
        const subSectionDetails = await SubSection.findById({_id:subSectionId});

        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:"SubSection data is not present",
            })
        }

        // fetching course progress
        let courseProgressDetails = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId,
        });

        // if course progress details does not found
        if( !courseProgressDetails ){
            return res.status(404).json({
                success:false,
                message:"Course progress does not exits",
            })
        }

        // check that video || subSectionId is already marked or not
        if(courseProgressDetails?.completedVideos.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"Subsection is already Completed",
            });
        }


        // marking video || subSection is completed
        courseProgressDetails?.completedVideos.push(subSectionId);

        await courseProgressDetails.save(); 
        
        // return responce
        return res.status(200).json({
            success:true,
            message:"Video marked completed successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error occured in marking vidoe completed",
        })
    }

}