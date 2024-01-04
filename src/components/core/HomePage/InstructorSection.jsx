import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighLightedText from './HighLightedText'
import CTAbutton from './CTAbutton'
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div>
        <div className=' flex flex-col lg:flex-row gap-24 items-center' >
            {/* left */}
            <div>
                <img src={Instructor} alt="" className='Instructor_image' />
            </div>
            {/* right */}
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-3' >
                {/* heading */}
                <h2 className='font-semibold text-4xl text-[#F1F2FF] w-[60%] ' >
                    Become an <HighLightedText text={"instructor"} />
                </h2>
                {/* subheading */}
                <p className='font-medium text-lg text-richblack-300 w-[90%] ' >
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                {/* button */}
                <div className=' pt-12 ' >
                    <CTAbutton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center' >
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>

                </div>

            </div>
        </div>
    </div>
  )
}

export default InstructorSection;