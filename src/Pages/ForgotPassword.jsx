import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';
import {getResetPasswordToken} from "../services/operations/authAPI"
import Spinner from '../components/common/Spinner';

const ForgotPassword = () => {

  // fetching value from slices
  const {loading} = useSelector( (state) => (state.auth) );

  // State variable used for keeping data related to email send or not 
  const [ emailSend, setEmailSend ] = useState(false);

  // state variable for storing value of email
  const [email, setEmail] = useState("");


  const dispatch = useDispatch();

  // submit function
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(getResetPasswordToken(email, setEmailSend));
  }



  return (
    <div className='w-11/12 max-w-maxContent mx-auto h-screen flex items-center justify-center' >
        {
          loading ? (
              <Spinner/>
          ):
          (
            <div className='flex flex-col gap-5 w-[33%]  ' >
              <div className='flex flex-col gap-3' >
                <h1 className='text-richblack-5 font-inter font-semibold text-3xl ' >{emailSend ? "Check email" : "Reset your password"}</h1>
                <p className='text-richblack-100 font-normal text-lg font-inter ' >{emailSend ? `We have sent the reset email to  ${email}` : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}</p>
              </div>

              {/* input feild */}
              {
                emailSend ? 
                (<div></div>) : 
                (
                  <form action="">
                    <label className='flex flex-col gap-2' >
                      <p className='font-normal text-sm text-richblack-5 flex flex-row gap-1 ' >Email Address<span className='text-pink-200 text-sm font-normal' >*</span></p>
                        <input 
                          required
                          type='email'
                          name='email'
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder='Enter your email'
                          className='bg-richblack-800 p-3 rounded-lg inputShadow text-base font-medium text-richblack-5 outline-none '
                        />
                      </label>
                  </form>                      
                )
              }

              {/* button */}
              <div className='flex flex-col gap-3  ' >
                <button onClick={handleOnSubmit} className='bg-yellow-50 p-3 rounded-lg text-base font-medium text-richblack-900' >
                  {
                    emailSend ? "Resend email" : "Reset Password"
                  }
                </button>

                <Link to={"/login"} >
                  <div className='text-richblack-5 flex gap-2 items-center p-3 pl-0 ' >
                    <FiArrowLeft fontSize={16} />
                    <p className='text-base font-medium' >Back to login</p>
                  </div>
                </Link>
              </div>


            </div>
          )
        }
    </div>
  )
}

export default ForgotPassword;