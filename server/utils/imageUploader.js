
const Cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary =  async (file, folder, height, quality) => {
    const options = {folder}
    if( height ){
        options.height = height;
    }

    if( quality ){
        options.quality = quality;
    }

    options.resource_type = "auto";

    return await Cloudinary.uploader.upload(file.tempFilePath, options) 
}