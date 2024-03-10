
import {setLoading, setToken} from "../../slices/authSlice"
import {setProfile} from "../../slices/profileSlice"
import {apiConnector} from "../apiconnector"
import {user} from "../apis"
import {toast} from "react-hot-toast"



// sendOtp
export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{
            const responce = await apiConnector("POST", user.SENDOTP_API, {
                email
            });

            if( !responce.data.success ){
                throw new Error(responce.data.message);
            }

            toast.success("OTP Sent Successfully");

            navigate("/verify-email");
        }
        catch(error){
            console.log("Error occured at sending otp", error);
            toast.error("Could Not Send OTP");
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }
}

// login
export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{
            const responce = await apiConnector("POST" ,user.LOGIN_API, {email, password});
            console.log("login responce..",responce);

            if( !responce.data.success ){
                throw new Error(responce.data.message);
            }
            
            toast.success("Login Successfully");

            dispatch(setToken(responce.data.token));
            dispatch(setProfile(responce.data.user));

            localStorage.setItem("token", JSON.stringify(responce.data.token));
            localStorage.setItem("user", JSON.stringify(responce.data.user)); 

            // calling auto logout component            
            setTimeout( () => {
                console.log("Auto logout triggered"); 
                dispatch(logout(navigate))
            }, 7200000 )
       
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("Error occured at login..", error);
            toast.error("Login Failed");
            navigate("/login");
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false)); 
    }
}

// logout
export const logout = (navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{

            dispatch(setToken(null));

            dispatch(setProfile(null));

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            toast.success("Logout Successfully");

            navigate("/");
        }
        catch(error){

        }
        dispatch(setLoading(false));
        toast.dismiss(toastID);
    }
}
 
// signUp
export const signUp = (firstName, lastName, email, password, confirmPassword, accountType, otp, navigate ) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{
            const responce = await apiConnector("POST", user.SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
                navigate,
            })

            // if an error occured
            if( !responce.data.success ){
                throw new Error(responce.data.message);
            }

            toast.success("Signup Successfully");

            navigate("/login");
        }
        catch(error){
            console.log("error occured at sign Up ", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }
}

// resetPasswordToken
export const getResetPasswordToken = ( email, setEmailSend ) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{
        
            const responce = await apiConnector("POST", user.RESETPASSWORDTOKEN_API, {email});
            console.log("printing the responce of RESETPASSWORD TOKEN API", responce);

            // if responce is false then we will throw error
            if( !responce.data.success ){
                throw new Error(responce.data.message)
            }

            // setting state variable true 
            setEmailSend(responce.data.success);

            // showing toast  
            toast.success("Reset Email Sent");
            

        }
        catch(error){
            console.log("Error occured at resetPasswordToken", error);
            toast.error("Failed To Send Reset Email");
        } 
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }
}

// Reset Password
export const resetPassword = ( password, confirmPassword, token, setPasswordUpdated, setEmail ) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastID = toast.loading("Loading...");
        try{
            const responce = await apiConnector("POST", user.RESETPASSWORD_API, {password, confirmPassword, token} );

            if( !responce.data.success ){
                throw new Error(responce.data.message);
            }

            // updating value of email using state variable
            setEmail(responce.data.email);

            setPasswordUpdated(responce.data.success);

            toast.success("Password Reset Successfully");

        }
        catch(error){
            console.log("Error occured at password update", error);
            toast.error("Failed To Reset Password");
        }
        toast.dismiss(toastID);
        dispatch(setLoading(false));
    }
}