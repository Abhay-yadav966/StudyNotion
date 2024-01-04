import React from 'react'
import HighLightedText from './HighLightedText';
import Know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAbutton from './CTAbutton';

const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-12 py-[90px] ' >

            {/* heading and subheading */}
            <div className='flex flex-col gap-3 items-center ' >
                <h2 className='font-semibold text-4xl text-richblack-900 text-center ' >
                    Your swiss knife for  <HighLightedText text={"learning any language"} />
                </h2>
                <p className='text-richblack-700 font-medium text-lg w-[100%] lg:w-[70%] text-center ' >
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>

            {/* picture */}
            <div className='flex flex-col lg:flex-row items-center justify-center  ' >
                <img src={Know_your_progress} alt="Know your progress picture  " className='lg:-mr-32'  />
                <img src={compare_with_others} alt="compare with others picture " className='-mt-12' />
                <img src={plan_your_lessons} alt="plan your lessons picture "  className=' -mt-16 lg:-ml-36' />
            </div>

            {/* button */}
            <div className='mx-auto' >
                <CTAbutton active={true} linkto={"/signup"} >
                    Learn More
                </CTAbutton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection;