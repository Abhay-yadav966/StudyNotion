
const BASE_URL = process.env.REACT_APP_BASE_URL


// User route endpoints
export const user = {
    LOGIN_API : BASE_URL + "/auth/login",
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    RESETPASSWORDTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
}


export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}
