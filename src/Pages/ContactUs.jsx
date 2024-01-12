import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import ContactUsForm from '../components/core/ContactPage/ContactUsForm';
import Footer from '.././components/common/Footer'


// contact data
const contact = [
    {
        icon:<HiChatBubbleLeftRight className='h-6 w-6'/>,
        heading:"Chat on us",
        subheading1:"Our friendly team is here to help.",
        subheading2:"yadavabhay966@gmail.com"
    },
    {
        icon:<BsGlobeEuropeAfrica className='h-6 w-6' />,
        heading:"Chat on us",
        subheading1:"Come and say hello at our office HQ.",
        subheading2:"Bhopal, Madhya Pradesh"
    },
    {
        icon:<FaPhoneAlt className='h-6 w-6' />,
        heading:"Call us",
        subheading1:"Mon - Fri From 8am to 5pm",
        subheading2:"+123 456 7869"
    }
]

const ContactUs = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='w-11/12 max-w-maxContent mx-auto ' >
            <div className='flex flex-col gap-10 lg:flex-row lg:gap-0 justify-between py-20 ' >
                {/* contact info */}
                <div className=' w-[100%] lg:w-[32%] flex flex-col gap-12 bg-richblack-800 rounded-xl p-8 h-fit' >
                    {
                        contact.map( (element, index) => (
                            <div key={index} className='flex gap-3 items-start' >
                                {/* logo */}
                                <div className='text-richblack-100' >
                                    {element.icon}
                                </div>

                                {/* heading and subheadings */}
                                <div className='flex flex-col gap-1' >
                                    <h3 className='font-semibold text-lg text-richblack-5' >{element.heading}</h3>
                                    <p className='font-medium text-sm text-richblack-200 ' >{element.subheading1}</p>
                                    <p className='font-semibold text-sm text-richblack-200 ' >{element.subheading2}</p>
                                </div>
                            </div>
                        ) )
                    }
                </div>

                {/* contact form */}
                <div className=' w-[100%] lg:w-[58%] border border-richblack-600 rounded-lg p-14 flex flex-col gap-8' >
                    <div className='flex flex-col gap-3' >
                        <h1 className='font-semibold text-4xl text-richblack-5' >Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className='font-medium text-base text-richblack-300 ' >Tall us more about yourself and what you’re got in mind.</p>
                    </div>
                    <ContactUsForm/>
                </div>
            </div>

            {/* rating and review */}

        </div>
        
        {/* footer */}
        <Footer/>
    </div>
  )
}

export default ContactUs;