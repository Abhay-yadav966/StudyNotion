
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

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
        

        // return responce
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        });
    }
    catch(err){
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
                                        .populate({
                                            path:"course",
                                            match: {status:"Published"},
                                            populate:{
                                                path:"ratingAndReviews",
                                            },
                                            populate:{
                                                path:"instructor",
                                            }
                                        })
                                        .exec();

        // validate
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Selected Category not found",
            });
        }

        //  Handle the case when there are no courses
        if( selectedCategory?.course?.length === 0 ){
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category."
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        )
        .populate({
          path: "course",
          match: { status: "Published" },
          populate:{
            path:"ratingAndReviews",
          },
          populate:{
            path:"instructor",
          },
        })
        .exec()

        // Get top-selling courses across all categories
        const allCategories = await Category.find({})
        .populate({
            path: "course",
            match: { status: "Published" },
            populate: {
                path: "ratingAndReviews"
            },
            populate:{
                path: "instructor",
            }
        })
        .exec()

        

        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in Category Page Details",
        });
    }
}