import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    // some methods of react hook form
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful }
    } = useForm();

    
    //contact from submit fn
    const submitContactForm = async (data) => {
        console.log(" form data", data);
    } 


    // reset data after submiting
    useEffect(()=> {
        if( isSubmitSuccessful ){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                contactNumber:"",
                message:"",
            })
        }
    },[isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)} >
        <div className='flex flex-col gap-7 ' >
                {/* first name and last name */}
                <div className='flex flex-col gap-7 lg:gap-0 lg:flex-row items-start justify-between' >
                    <label className='flex flex-col gap-2 w-[100%] lg:w-[48%] ' >
                        <p className='font-normal text-sm text-richblack-5 ' >First Name</p>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='Enter first name'
                            {...register("firstName", {required:true})}
                            className='rounded-lg p-3 bg-richblack-800 CTAblackbutton '
                        />

                        {/* error */}
                        {
                            errors.firstName && (<div className='font-normal text-sm text-yellow-50 '>
                                Enter your first name                                    
                            </div>)
                        }
                    </label>

                    <label className='flex flex-col gap-2 w-[100%] lg:w-[48%] ' >
                        <p className='font-normal text-sm text-richblack-5 ' >Last Name</p>
                        <input 
                            type="text"
                            name='lastName'
                            placeholder='Enter last name'
                            {...register("lastName")}
                            className='rounded-lg p-3 bg-richblack-800 CTAblackbutton '
                        />

                    </label>

                </div>

                {/* email */}
                <label className='flex flex-col gap-2' >
                    <p className='font-normal text-sm text-richblack-5 ' >Email Address</p>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email Address'
                        {...register("email", {required:true})}
                        className='rounded-lg p-3 bg-richblack-800 CTAblackbutton '
                    />

                    {/* errors */}
                    {
                        errors.email && (<div className='font-normal text-sm text-yellow-50 ' >
                            Please Enter your email
                        </div>)
                    }
                </label>

                {/* phone no. */}
                <lable className='flex flex-col gap-2  ' >
                    <p className='font-normal text-sm text-richblack-5 ' >Phone Number</p>
                    <div className='flex gap-6 ' >
                        {/* drop down */}
                        <select className=' w-[75px] rounded-lg p-3 bg-richblack-800 CTAblackbutton outline-none font-medium text-base text-richblack-200 ' >
                            {
                                CountryCode.map( (element, index) => (
                                    <option key={index} value={element.code} >
                                        {element.code} -{element.country}
                                    </option>
                                ) )
                            }
                        </select>
                        
                        {/* input */}
                        <input
                            type='number'
                            name='contactNumber'
                            placeholder='Enter contact number'
                            {...register("contactNumber", {required:true, maxLength:{value:10}, minLength:{value:8}})}
                            className='rounded-lg p-3 bg-richblack-800 CTAblackbutton w-[85%]'
                        />

                    </div>
                    {/* errors */}
                    {
                        errors.contactNumber && (<div className='font-normal text-sm text-yellow-50 ' >
                            Invalid Phone number
                        </div>)
                    }
                </lable>

                {/* message */}
                <label className='flex flex-col gap-2' >
                    <p className='font-normal text-sm text-richblack-5 ' >Message</p>
                    <textarea
                        name='message'
                        placeholder='Enter your message here'
                        cols={30}
                        rows={7}
                        {...register("message", {required:true})}
                        className='rounded-lg p-3 bg-richblack-800 CTAblackbutton '
                    />

                    {/* errors */}
                    {
                        errors.message && (<div className='font-normal text-sm text-yellow-50 ' >
                            Please Enter your message
                        </div>)
                    }
                </label>

                {/* submit button */}
                <button type='submit' className='font-inter text-[16px] px-6 py-3 rounded-lg font-bold bg-yellow-50 text-black CTAyellowbutton hover:scale-95 transition-all duration-200 ' >
                    Send Message
                </button>
                

        </div>    
    </form>
  )
}

export default ContactUsForm;