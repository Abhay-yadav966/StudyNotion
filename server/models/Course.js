
const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true,
    },

    courseDescription:{
        type:String,
        trim:true,
        required:true,
    },

    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    whatYouWillLearn:{
        type:String,
    },

    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],

    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
        }
    ],

    price:{
        type:Number,
    },

    thumbnail:{
        type:String,
    },

    tag: {
		type: String,
		required: true,
	},
    
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },

    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    ],

    instructions: {
		type: String,
	},

	status: {
		type: String,
		enum: ["Drafted", "Published"],
	},

    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Course", courseSchema);