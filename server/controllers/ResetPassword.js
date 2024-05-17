
const User = require("../models/User");
const {mailSender} = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");


// resetPassword token

exports.resetPasswordToken = async (req, res) => {
    try{
        // get email from req body
        const {email} = req.body;

        // validate email
        if(!email){
            return res.status(403).json({
                success:false,
                message:"Email is required",
            });
        }

        // check user for this email
        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Your email is not registered with us",
            });
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate( {email:email }, 
                                                             { 
                                                                token: token,
                                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                                             },
                                                             {new:true}
                                                            );

        // create url
        const url = `https://studynotion-abhay.vercel.app/update-password/${token}`

        // send mail containing the url
        await mailSender(email,
                        "Password Reset Link",
                        `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        // return responce
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully , Check your email and change Password",
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong while reset the password and sending mail",
        });
    }
}

// ResetPassword

exports.resetPassword = async (req, res) => {
    try{
        // fetch data from req body
        const {password, confirmPassword, token} = req.body;

        // validation 
        if( !password || !confirmPassword ){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }

        if( password !== confirmPassword ){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            });
        }

        // get user details from DB using token
        const userDetails = await User.findOne({token:token});

        // invalid token - means there is no entry in DB
        if( !userDetails ){
            return res.json({
                success:false,
                message:"Invalid Token",
            });
        }

        // check token is expire or not
        if( userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success:false,
                message:"Token is expired, Please regenerate your token",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate({token:token},
                                    {password:hashedPassword},
                                    {new:true},
                                    );

        // send mail
        await mailSender( userDetails.email, "Password Updated Successfully",
                        passwordUpdated(userDetails.email, userDetails.firstName) )

        // return responce
        return res.status(200).json({
            success:true,
            email:userDetails.email,
            message:"Password reset Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in reseting password and updating it.",
        });
    }
}