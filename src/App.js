import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import ForgotPassword from "./Pages/ForgotPassword"
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Error from './Pages/Error';
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from './components/core/Dashboard/cart/index'
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from './utils/constants'
import AddCourse from "./components/core/Dashboard/AddCourseSection/AddCourse";

function App() {

  // fetching user details
  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden overflow-y-auto " >
      <Navbar/>
      
      <Routes>
        {/* home page */}
        <Route path="/" element={<Home/>} />

        {/* login page */}
        <Route path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        {/* SignUP */}
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        {/* forgot password */}
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        {/* update password */}
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        {/* verify email page */}
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        {/* about us page */}
        <Route
          path="/about"
          element={
              <About/> 
          }
        />

        {/* contact us page */}
        <Route
          path="/contact"
          element={            
            <ContactUs/>            
          }
        />

        {/* Dashboard -> nested routing */} 
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>  
            </PrivateRoute>
          }
        >

          {/* dashboard my profile */}
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>

          {/* these routes are only for students */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                {/* dashboard enrolled courses */}
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />

                {/* dashboard cart */}
                <Route path="/dashboard/cart" element={<Cart/>} />
              </>
            )
          }

          {/* these routes only for instructor */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse/>} />
              </>
            )
          }

          {/* dashboard settings */}
          <Route path="/dashboard/settings" element={<Settings/>}/>

        </Route>




        {/* if someone has entered wrong path that does not exist */}
        <Route
          path="*"
          element={
            <Error/>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
 