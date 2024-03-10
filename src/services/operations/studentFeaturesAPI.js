
import {toast} from 'react-hot-toast';
import {studentEndpoints} from '../apis'
import {apiConnector} from '../apiconnector'
import rzp_logo from '../../assets/Logo/rzp_logo.png'
import {setPaymentLoading} from '../../slices/courseSlice'
import {resetCart} from '../../slices/cartSlice'

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => { 
    const toastId = toast.loading("Loading...");
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                                    {courses},
                                                    {
                                                        Authorization : `Bearer ${token}`,
                                                    });

        console.log("response --->", orderResponse);
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency:orderResponse?.data?.paymentResponse?.currency,
            amount:`${orderResponse?.data?.paymentResponse?.amount}`,
            order_id:orderResponse?.data?.paymentResponse?.id,
            name:"StudyNotion",
            description:"Thank You for Purchasing the Course",
            image:rzp_logo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email,
            },
            handler: function(response){
                // send successful email
                SendPaymentSuccessEmail( response, orderResponse?.data?.paymentResponse?.amount, token);
                // verify Payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            } ,
        }

        // Dialog box
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed", function(responce){
            toast.error("oops, payment failed");
            console.log(responce.error);
        })
    }
    catch(error){
        console.log("PAYMENT API ERROR", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function SendPaymentSuccessEmail( responce, amount, token ){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {orderId: responce.razorpay_order_id, paymentId: responce.razorpay_payment_id, amount}, 
                                                                    {
                                                                        Authorization:`Bearer ${token}`
                                                                    });
    }   
    catch(error){
        console.log("Payment success email error...", error);
    }
}


// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, 
                                                                        {
                                                                            Authorization : `Bearer ${token}`,
                                                                        });

        console.log(" verify order response -------> ", response);

        if( !response.data.success ){
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(error){
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
