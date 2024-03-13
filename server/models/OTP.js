
const mongoose = require("mongoose");
const {mailSender} = require("../utils/MailSender")
const {otpTemplate} = require("../mail/templates/emailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },

    otp:{
        type:String,
        required:true
    }, 

    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    }
});

// a function -> to send mails
const sendVerificationEmail = async (email, otp) => {
    try{
        const mailResponse = await mailSender(email, "verification Email from StudyNotion", otpTemplate(otp));
        console.log("Email send Successfully", mailResponse);
    }
    catch(err){
        console.log("Error occured at pre middleware");
        console.log(err);
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema); 