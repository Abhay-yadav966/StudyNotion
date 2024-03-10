
const {instance} = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const {mailSender} = require("../utils/MailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");

// for buying multiple course
// create order
exports.capturePayment = async (req, res) => {
    try{
        const {courses} = req.body;
        const userId = req.user.id;

        let totalAmount = 0;

        for( courseId of courses ){

            try{
                const courseDetails = await Course.findById({_id:courseId});
    
                if(!courseDetails){
                    return res.status(404).json({
                        success:false,
                        message:"Course not found",
                    })
                }
    
                const uid = new mongoose.Types.ObjectId(userId);
                if( courseDetails.studentEnrolled.includes(uid) ){
                    return res.status(200).json({
                        success:false,
                        message:"User already enrolled course",
                    })
                }
    
                totalAmount = totalAmount + courseDetails.price;
            }
            catch(err){
                return res.status(500).json({
                    success:false,
                    message:err.message,
                })
            }

        }


        // options
        const options = {
            amount : totalAmount * 100,
            currency : "INR",
            receipt:Math.random(Date.now()).toString(),
        }

        
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            paymentResponse,
        })
        
        
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
    try{
        const razorpay_order_id = req?.body?.razorpay_order_id;
        const razorpay_payment_id = req?.body?.razorpay_payment_id;
        const razorpay_signature = req?.body?.razorpay_signature;

        const courses = req?.body?.courses;
        const userId = req.user.id;

        if( !razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId ){
            return res.status(200).json({
                success:false,
                message:"Payment Failed" 
            })
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex");

        if( expectedSignature === razorpay_signature ){

            // enroll student
            await enrollStudents(courses, userId, res);

            // return
            return res.status(200).json({
                success:true,
                message:"Payment Verified",
            })
        }

        return res.status(500).json({
            success:false,
            message:"Payment Failed",
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Payment Failed3",
        })
    }
}

// enroll students
const enrollStudents = async (courses, userId, res) => {
    try{
        if( !courses || !userId ){
            return res.status(400).json({
                success:false,
                message:"Please Provide data for Courses or UserId",
            })
        }

        for( courseId of courses ){

            // find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},
                                                                    {
                                                                        $push:{
                                                                            studentEnrolled:userId,
                                                                        }
                                                                    },
                                                                    {new:true});

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                })
            }

            // creating the course progress for the student
            const courseProgress = await CourseProgress.create({
                courseId:courseId,
                userId:userId,
                completedVideos:[],
            });

            // find the student and add the course to their list of enrolledCourses
            const enrolledStudents = await User.findByIdAndUpdate({_id:userId},
                                                                    {
                                                                        $push:{
                                                                            courses:courseId,
                                                                            courseProgress:courseProgress?._id,
                                                                        }
                                                                    },
                                                                    {new:true});

            // sending mail to student
            const mailResponse = await mailSender( enrolledStudents.email,
                                                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                                                    courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudents.firstName} ${enrolledStudents.lastName}` )  );

        }

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}


// payment successfull emails
exports.sendPaymentSuccessEmail = async (req, res) => {
    try{
        const {orderId, paymentId, amount} = req.body;

        const userId = req.user.id;

        // validations
        if( !orderId || !paymentId || !amount || !userId){
            return res.status(400).json({
                success:false,
                message:"Please provide all the fields"
            })
        }

        // find student
        const enrolledStudent = await User.findById({_id:userId});

        await mailSender( enrolledStudent.email, "Payment Recieved", paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`, 
                                                                                               amount/100,
                                                                                               orderId,
                                                                                               paymentId) );
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}



// below code is used for buying only one course it cannot handle inside the cart like situations buying multiple course

// createOrder
// exports.capturePayment = async (req, res) => {
//     try{
//         // fetch data
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         // validation
//         // validate course id
//         if(!course_id){
//             return res.status(404).json({
//                 success:false,
//                 message:"Please Provide valid course Id",
//             });
//         }

//         const courseDetails = await Course.findById({_id:course_id});

//         if(!courseDetails){
//             return res.status(404).json({
//                 success:false,
//                 message:"Could not find the course",
//             });
//         }

//         // validate user Id
//         if(!userId){
//             return res.status(404).json({
//                 success:false,
//                 message:"Provide valid user Id",
//             });
//         }

//         // check user na pahala se toh course nhi lia
//         const uid = mongoose.Types.ObjectId(userId);

//         if(courseDetails.studentEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student is Already registered",
//             });
//         }

//         // create order
//         const amount = courseDetails.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 course_id,
//                 userId,
//             },
//         }

//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // return response
//         return res.status(200).json({
//             success:true,
//             courseName:courseDetails.courseName,
//             courseDescription:courseDetails.courseDescription,
//             thumbnail:courseDetails.thumbnail,
//             amount:paymentResponse.amount,
//             currency:paymentResponse.currency,
//             orderId:paymentResponse.id,
//         });
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             error:err.message,
//             message:"Could not initiate order",
//         });
//     }
// }


// verify signature
// exports.verifySignature = async (req, res) => {
//     try{
        
//         const webHookSecret = "123456";

//         const signature = req.headers["x-razorpay-signature"];

//         const shasum = crypto.createHmac("sha256", webHookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");

//         if( signature === digest ){
//             console.log("Payment is Authorised");

//             // fetch userid and courseid
//             const {course_id, userId} = req.body.payload.payment.entity.notes;

//             // find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                                     {_id:course_id},
//                                     {
//                                         $push:{
//                                             studentEnrolled:userId,
//                                         }
//                                     },
//                                     {new:true},
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course Not found",
//                 });
//             }

//             // find the user and update courses list in it
//             const enrolledStudent = await User.findByIdAndUpdate(
//                                         {_id:userId},
//                                         {
//                                             $push:{
//                                                 courses:course_id,
//                                             }
//                                         },
//                                         {new:true},
//             );

//             if(!enrolledStudent){
//                 return res.status(500).json({
//                     success:false,
//                     message:"User not found",
//                 });
//             }

//             // send email for confirmation
//             const eMailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations",
//                                         "Congratulations, you are onboarded into new Course",
//             );

//             console.log(eMailResponse);

//             // return response
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added",
//             });

//         }
//         else{
//             return res.status(400).json({
//                 success:false,
//                 message:"Signature Invalid",
//             });
//         }

//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             error:err.message,
//             message:"Something went wrong in verifing Signature",
//         });
//     }
// }