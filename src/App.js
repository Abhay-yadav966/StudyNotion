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


function App() {
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


        {/* dashboard my profile */}
        <Route 
          path="dashboard/my-profile"
          // element={<MyProfile/>}
        />

      </Routes>
    </div>
  );
}

export default App;
 