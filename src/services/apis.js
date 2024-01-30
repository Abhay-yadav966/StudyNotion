
const BASE_URL = process.env.REACT_APP_BASE_URL


// User route endpoints
export const user = {
    LOGIN_API : BASE_URL + "/auth/login",
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    RESETPASSWORDTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
}

// categories route endpoints 
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}

// setting route endpoints
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API : BASE_URL + "/profile/deleteProfile"
}

// profile route endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses", 
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
  }