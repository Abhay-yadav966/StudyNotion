import React from 'react'
import HighLightedText from '../HomePage/HighLightedText';
import CTAbutton from '../HomePage/CTAbutton';
import LearningGridBox from './LearningGridBox'

const LearningGrid = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto m-20' >
        {/* upper wala */}
        <div className= ' flex flex-col gap-10 items-center lg:flex-row lg:items-start lg:justify-between lg:gap-0' >
            {/* left */}
            <div className='flex flex-col gap-3 w-[44%] ' >
                <h1 className='font-semibold text-4xl text-richblack-5 ' >World-Class Learning for <HighLightedText text={"Anyone, Anywhere"} /></h1>
                <p className='font-medium text-base text-richblack-300 mb-2 ' >Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                <CTAbutton active={true} linkto={"/"} >
                    Learn More
                </CTAbutton>
                
            </div>
            {/* right */}
            <div className='flex flex-col w-[100%]  lg:flex-row  items-center lg:w-[50%] ' >
                <LearningGridBox 
                    heading={"Curriculum Based on Industry Needs"} 
                    subHeading={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
                    active={true} 
                />

                <LearningGridBox 
                    heading={"Our Learning Methods"} 
                    subHeading={"The learning process uses the namely online and offline."} 
                    active={false} 
                />
            </div>
        </div>

        {/* nicha wala */}
        <div className='flex  flex-col-reverse items-center lg:flex-row-reverse ' >
            
            {/* right */}
            <div className='flex flex-col lg:flex-row lg:w-[50%] ' >
                <LearningGridBox 
                    heading={`Rating "Auto-grading"`} 
                    subHeading={"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."} 
                    active={false} 
                />       

                <LearningGridBox 
                    heading={"Ready to Work"} 
                    subHeading={"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."} 
                    active={true} 
                />
            </div>
            
            {/* left */}
            <LearningGridBox 
                heading={"Certification"} 
                subHeading={"You will get a certificate that can be used as a certification during job hunting."} 
                active={true} 
            /> 
        </div>
    </div>
  )
}

export default LearningGrid;