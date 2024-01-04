
const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// update profile
exports.updateProfile = async (req, res) => {
    try{
        // fetch data from req
        const { dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get user id
        const userId = req.user.id;
 
        // validation
        if( !contactNumber || !gender ||  !userId){
            return res.status(400).json({
                success:false,
                message:"All Fields are Required",
            });
        }

        // find profile
        const userDetails = await User.findById({_id:userId});

        const profileId = userDetails.additionDetails;

        // update profile
        const updateProfile = await Profile.findByIdAndUpdate(
                                            {_id:profileId},
                                            {                                            
                                                gender:gender,
                                                contactNumber:contactNumber,
                                                dateOfBirth:dateOfBirth,
                                                about:about,                                                
                                            },
                                            {new:true},
        );

        // return res.
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            updateProfile,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Update Profile, Please try again",
        });
    }
}  


// delete Profile

exports.deleteAccount = async (req, res) => {
    try{
        // get user id
        const userId = req.user.id;

        // user
        const userDetails = await User.findById({_id:userId});

        // validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Not Found",
            });
        }

        // delete additionalDetails - profile
        const profileId = userDetails.additionDetails;

        await Profile.findByIdAndDelete({_id:profileId});

        // ToDO - jitta v course lia h waha se user ko unenroll krna hoga
        // delete user Account
        await User.findByIdAndDelete({_id:userId});

        // return responce
        return res.status(200).json({
            success:true,
            message:"User Account Deleted Successfully",
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Delete Profile, Please try again",
        });
    }
}


// All UserDetails
exports.getAllUserDetails = async (req, res) => {
    try{
        // fetch data from req.
        const userId = req.user.id;

        // validation
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Id not found",
            });
        }

        // get data from DB
        const userDetails = await User.findById({_id:userId}).populate("additionDetails").exec();

        // validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Details not found",
            });
        }

        // return responce
        return res.status(200).json({
            success:true,
            message:"User Details Fetched Successfully",
            userDetails,
        });


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Get User Details, Please try again",
        });
    }
}

// update profile picture
exports.updateDisplayPicture = async (req, res) => {
    try{
        // fetch data from req.
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        console.log("DP ->",displayPicture);
        console.log("userid ->", userId)

        // validation
        if( !displayPicture || !userId){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }

        // upload image to cloudinary
        const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);
        console.log(image);

        // update user model
        const updatedUser = await User.findByIdAndUpdate(
                                        {_id:userId},
                                        {                                            
                                            image:image.secure_url,                                            
                                        },
                                        {new:true},
        );
        

        // return response
        return res.status(200).json({
            success:true,
            message:"Display picture updated Successfully",
            updatedUser,
        });  

    } 
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in updating Profile picture",
            error:err.message,
        });
    }
}

// getEnrolledCourses 
exports.getEnrolledCourses = async (req, res) => {
    try{
        // fetch data from req.
        const userId = req.user.id;
        // validation
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"All fields are required",
            });
        }

        // course datails
        const userDetails = await User.findById({_id:userId}).populate("courses").exec();

        // validate
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not found user Details",
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:userDetails.courses,
        });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in GetEnrolled Courses",
        });
    }
} 