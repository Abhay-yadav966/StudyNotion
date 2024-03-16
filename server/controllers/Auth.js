
const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/MailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();



// Send OTP
exports.sendOTP = async (req, res) => {
    try{
        // fetch email from request body
        const {email} = req.body;

        // check user already exists or not
        const checkUserPresent = await User.findOne({email:email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already exists"
            });
        }  

        // OPT generate
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })


        // check opt is unique or not
        let result = await OTP.findOne({otp:otp});

        while(result){
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp:otp});
        }

        // creating entry in DB

        const otpPayload = {
            email,
            otp,
        }

        const otpBody = await OTP.create(otpPayload);

        // responce
        res.status(200).json({
            success:true,
            message:"Opt Send SuccessFully",
            otp
        });
    } 
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in Otp Generator",
        });
    }
} 
 

// SignUp
exports.signUp = async (req, res) => {
    try{
        // fetch data from req body
        const {
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        // validate kro
        if( !firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType){
            return res.status(403).json({
                success:false,
                message:"All fields are required ",
            });
        }

        // 2 no password match kro
        if( password !== confirmPassword ){
            return res.status(400).json({
                success:true,
                message:"Password does not match, Please try again",
            });
        }


        // user already exists
        const existingUser = await User.findOne({email:email});

        if(existingUser){
            return res.status(403).json({
                success:false,
                message:"User Already Registered",
            });
        }

        // find most recent stored otp in DB
        const recentOTP = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        // const recentOTP = await OTP.find({email:email});
        


        // otp validate
        if( recentOTP.length === 0 ){
            // opt not found
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
        }
        
        // matching otp with DB wala otp
        if( otp !== recentOTP[0].otp ){
            return res.status(500).json({
                success:false,
                message:"Invalid OTP",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry of user in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });
        // send responce

        res.status(200).json({
            success:true,
            message:"User Register Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"User does not registered, please try again",
        });
    }
}


// login
exports.logIn = async (req, res) => {
    try{
        // fetch data from request body
        const {email, password} = req.body;

        // validation
        if( !email || !password ){
            return res.status(403).json({
                success:false,
                message:"Please fill all details carefully",
            });
        }

        // user already exists or not
        const user = await User.findOne({email:email}).populate("additionDetails").exec();

        if(!user){
            return res.status(404).json({
                success:false,
                message:"SignUp first User not Found",
            });
        }

        // check Password match & generate JWT
        if( await bcrypt.compare(password, user.password) ){

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            
            user.token = token;
            user.password = undefined;  

            // create cookie and send responce

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000 ),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                user,
                token,
                message:"Logged in Successfully",
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password, "
            });
        }

    }
    catch(err){
        
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Login failed, Please try again",
        });
    }
}


// change password 

exports.changePassword = async (req, res) => {
    try{
        // fetch data from request
        const {oldPassword, newPassword} = req.body;
        // validation

        if(!oldPassword || !newPassword ){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }


        // check old password is correct or not
        const userId = req.user.id;
        const userDetails = await User.findById({_id:userId}); 

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            });
        }


        // update Password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedDetails = await User.findByIdAndUpdate(
                                            {_id:userId},
                                            {
                                                password:encryptedPassword,    
                                            },
                                            {new:true},
        );


        // send email
        await mailSender(
            updatedDetails.email,
			`Password updated successfully for ${updatedDetails.firstName} ${updatedDetails.lastName}`,
            `Dear ${updatedDetails.firstName} ${updatedDetails.lastName}<br><br>
            This is to confirm that the password for your account has been successfully changed. Your account is now secured with the new password that you have set.
            <br><br>If you did not change your password, please contact us immediately to report any unauthorized access to your account.`
			
        ); 

        
        // return res
        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        });


    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Unable to Change Password, Please try again",
        });
    }
} 
