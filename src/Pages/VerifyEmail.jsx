import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from ".././components/common/Spinner"
import OTPInput from 'react-otp-input';
import { FiArrowLeft } from "react-icons/fi";
import { GiBackwardTime } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { signUp, sendOtp } from '../services/operations/authAPI';

const VerifyEmail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // fetching data from slice
    const {loading, signUpDate} = useSelector( (state) => (state.auth) );

    // state variable for otp
    const [otp, setOtp] = useState("");

    // destructuring the signUp data
    const { firstName, lastName, email, password, confirmPassword, accountType } = signUpDate;

    // submit handler
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(signUp( firstName, lastName, email, password, confirmPassword, accountType, otp, navigate ));
    }

  return (
    <div className='w-11/12 max-w-maxContent mx-auto min-h-screen flex items-center justify-center ' >
        {
            loading ? 
            (
                <Spinner/>
            ):
            (
                <div className='flex flex-col gap-6 w-[33%] ' >
                    {/* heading and subheading */}
                    <div className='flex flex-col gap-3' >
                        <h1 className='font-semibold text-3xl text-richblack-5 ' >Verify email</h1>
                        <p className='font-normal text-lg text-richblack-100' >A verification code has been sent to you. Enter the code below</p>
                    </div>

                    {/* opt input field */}
                    <div>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className='text-richblack-5' >-</span>}
                            renderInput={(props) => <input {...props} 
                            placeholder='-'
                            className='bg-richblack-800  text-richblack-5 mx-5 rounded-lg  '
                            />}
                            
                        />
                    </div>

                    {/* button */}
                    <div className='flex flex-col gap-3' >
                        <button onClick={submitHandler} className='bg-yellow-50 p-3 rounded-lg font-medium text-base  ' >
                            Verify email
                        </button>

                        {/* back to login and resend button */}
                        <div className='flex flex-row gap-3 items-center justify-between ' >
                            {/* pagin page */}
                            <Link to={"/login"} >
                                <div className='flex items-center gap-2 pl-0 p-3 text-richblack-5 ' >
                                    <FiArrowLeft fontSize={16} />
                                    <p className=' font-medium text-base' >Back to login</p>
                                </div>
                            </Link>

                            {/* Resend it */}
                            <button onClick={() => dispatch(sendOtp(signUpDate.email, navigate))} className='flex items-center gap-2 pr-0 p-3 text-blue-100 ' >
                                <GiBackwardTime fontSize={20} />
                                <p className='font-medium text-base' >Resend it</p>
                            </button>
                        </div>

                    </div>

                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail;