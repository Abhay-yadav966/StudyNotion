const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/User");

  
// auth 
exports.auth = async (req, res, next) => {
    try{

        // extract token
        const token = req.cookies.token
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");

        // Token missing
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing",
            });
        }

        // verify/decode the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(err){
            return res.status(498).json({
                success:false,
                message:"Token is invalid",
            });
        }

        // moving to next middleware
        next();

    }
    catch(err){ 
        return res.status(500).json({
            success:false,
            message:"Something went wrong in validating the token",
        });
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if( req.user.accountType !== "Student" ){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for the Student only",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if( req.user.accountType !== "Instructor" ){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for the Instructor only",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if( req.user.accountType !== "Admin" ){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for the Admin only",
            });
        }
        next();
    }
    catch(err){ 
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}  