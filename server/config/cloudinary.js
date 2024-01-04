const Cloudinary = require("cloudinary").v2
require("dotenv").config();

exports.cloudinaryConnect = () => {
    try{
        Cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }
    catch(err){
        console.log(err); 
    }
}