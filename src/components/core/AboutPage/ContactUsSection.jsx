import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm';

const ContactUsSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-12 ' >

        {/* heading and subheading */}
        <div className='flex flex-col items-center gap-3 ' >
            <h1 className='font-semibold text-4xl text-richblack-5' >Get in Touch</h1>
            <p className='font-medium text-base text-richblack-300  ' >We’d love to here for you, Please fill out this form.</p>
        </div>

        {/* form */}
        <div className='w-[40%]' >
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactUsSection;