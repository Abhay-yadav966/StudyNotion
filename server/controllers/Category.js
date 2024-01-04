
const Category = require("../models/Category");


// create Category
exports.createCategory = async (req, res) => {
    try{
        // fetching data req
        const {name, description} = req.body;

        // validation
        if( !name || !description ){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        // return responce
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in creating category",
        });
    }
}
 

// getAllCategories

exports.getAllCategories = async (req, res) => {
    try{

        const allCategories = await Category.find({});

        res.status(200).json({
            success:true,
            message:"All Categories Returned Successfully",
            allCategories,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in getAllcategory",
        });
    }
}

// category page Details
exports.categoryPageDetails = async (req, res) => {
    try{
        // fetch data
        const {categoryId} = req.body;

        // fetch courses related to category
        const selectedCategory = await  Category.findById({_id:categoryId})
                                        .populate("course")
                                        .exec();

        // validate
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Selected Category not found",
            });
        }

        // fetch courses related to different categories
        const differentCategory = await Category.find(
                                    {_id: {$ne: categoryId}},
                                )
                                .populate("course")
                                .exec();

        // validate
        if(!differentCategory){
            return res.status(404).json({
                success:false,
                message:"Different category not found",
            });
        }

        // top selling courses
        // HW

        // return response
        return res.status(200).json({
            success:true,
            selectedCategory,
            differentCategory,
            
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in Category Page Details",
        });
    }
}