
const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const {mailSender} = require("../utils/MailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

// createOrder
exports.capturePayment = async (req, res) => {
    try{
        // fetch data
        const {course_id} = req.body;
        const userId = req.user.id;

        // validation
        // validate course id
        if(!course_id){
            return res.status(404).json({
                success:false,
                message:"Please Provide valid course Id",
            });
        }

        const courseDetails = await Course.findById({_id:course_id});

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find the course",
            });
        }

        // validate user Id
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"Provide valid user Id",
            });
        }

        // check user na pahala se toh course nhi lia
        const uid = mongoose.Types.ObjectId(userId);

        if(courseDetails.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:"Student is Already registered",
            });
        }

        // create order
        const amount = courseDetails.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                course_id,
                userId,
            },
        }

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        // return response
        return res.status(200).json({
            success:true,
            courseName:courseDetails.courseName,
            courseDescription:courseDetails.courseDescription,
            thumbnail:courseDetails.thumbnail,
            amount:paymentResponse.amount,
            currency:paymentResponse.currency,
            orderId:paymentResponse.id,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Could not initiate order",
        });
    }
}


// verify signature
exports.verifySignature = async (req, res) => {
    try{
        
        const webHookSecret = "123456";

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webHookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if( signature === digest ){
            console.log("Payment is Authorised");

            // fetch userid and courseid
            const {course_id, userId} = req.body.payload.payment.entity.notes;

            // find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                                    {_id:course_id},
                                    {
                                        $push:{
                                            studentEnrolled:userId,
                                        }
                                    },
                                    {new:true},
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course Not found",
                });
            }

            // find the user and update courses list in it
            const enrolledStudent = await User.findByIdAndUpdate(
                                        {_id:userId},
                                        {
                                            $push:{
                                                courses:course_id,
                                            }
                                        },
                                        {new:true},
            );

            if(!enrolledStudent){
                return res.status(500).json({
                    success:false,
                    message:"User not found",
                });
            }

            // send email for confirmation
            const eMailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations",
                                        "Congratulations, you are onboarded into new Course",
            );

            console.log(eMailResponse);

            // return response
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course Added",
            });

        }
        else{
            return res.status(400).json({
                success:false,
                message:"Signature Invalid",
            });
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            error:err.message,
            message:"Something went wrong in verifing Signature",
        });
    }
}