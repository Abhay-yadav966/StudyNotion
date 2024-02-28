
import toast from 'react-hot-toast';
import {studentEndpoints} from '../apis'
import {apiConnector} from '../apiconnector'
import rpzLogo from '../../assets/Logo/'

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

        if( !orderResponse.data.success ){
            throw new Error(orderResponse.data.message);
        }

        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank You for Purchasing the Course",
            image:,
            prefill:{
                name:``,
                email:
            },
            handler: function(response){
                // send successful email
                SEND_PAYMENT_SUCCESS_EMAIL_API(responce, orderResponse.data.data.amount, token);
                // verify Payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            } ,
        }
    }
    catch(error){
        console.log("PAYMENT API ERROR", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

