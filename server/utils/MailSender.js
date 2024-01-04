
const nodeMailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async ( email, title, body ) => {
    try{
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST ,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from:"StudyNotion - Abhay Yadav",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });

        console.log(info);
        return info;
    }
    catch(err){
        console.log(err);
        console.error(err);
    }
} 