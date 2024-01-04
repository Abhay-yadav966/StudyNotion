import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighLightedText from '../components/core/HomePage/HighLightedText';
import CTAbutton from '../components/core/HomePage/CTAbutton';
import banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelinSection from '../components/core/HomePage/TimelinSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';

const Home = () => {

  return (
    <div className='font-inter' >
        {/* section 1 */}
        <div className='  relative mx-auto text-white flex flex-col w-11/12 max-w-maxContent items-center justify-between  ' >
            
            {/* button */}
            <Link to={"/signup"} >
                <div className=' becomeInstructorButton group mt-16 p-1  rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ' >
                    <div className=' flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900' >
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            {/* Heading */}
            <div className=' text-4xl font-semibold mt-7 text-center ' >
                <p>Empower Your Future with <HighLightedText text={"Coding Skills"} /> </p>
            </div>

            {/* subSection */}
            <div className=' mt-4 text-center w-[80%] max-w-maxContent font-bold text-lg text-richblack-300' >
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
            </div>

            {/* buttons */}
            <div className='flex flex-row gap-6 mt-8' >
                <CTAbutton linkto={"/signup"} active={true}>
                    Learn More
                </CTAbutton>

                <CTAbutton linkto={"/login"} active={false}>
                    Book a Demo
                </CTAbutton>
                
            </div>

            {/* video  */}
            <div className=' videoBlueShadow mx-3 my-16' >
                <video className='videoShadow' loop autoPlay muted src={banner} >
                </video>
            </div>

            {/* Code section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                            <div>
                                Unlock your <HighLightedText text={"coding potential"} /> with our online courses.
                            </div>
                        }
                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            btntext:"Try it Yourself",
                            active:true,
                            linkto:"/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btntext:"Learn More",
                            active:false,
                            linkto:"/login"
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <title>This is myPage</title>
                        </head>
                        <body>
                        <h1><a href="/">Header</a></h1>
                        <nav> <a href="/one">One</a> <a 
                        href="/two">Two</a> <a href="/three">Three</a>
                        </nav>
                        </body>`
                    }

                    codecolor={"text-yellow-25"}
                    
                    
                />
            </div>

            {/* Code Section 2 */}
            <div>
            <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                            <div className=' w-[100%] lg:w-[50%]' >
                                Start <HighLightedText text={"coding in seconds"} />
                            </div>
                        }
                    subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            btntext:"Continue Lesson",
                            active:true,
                            linkto:"/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btntext:"Learn More",
                            active:false,
                            linkto:"/login"
                        }
                    }

                    codeblock={
                        `import React from "react";
                        import CTAButton from "./Button";
                        import TypeAnimation from "react-type";
                        import { FaArrowRight } from "react-icons/fa";

                        const Home = () => {
                        return (
                        <div>Home</div>
                        )
                        }
                        export default Home;`
                    }

                    codecolor={"text-white"}

                    
                />
            </div>

            {/* explore more section */}
            <ExploreMore/>

        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 ' >
            <div className='homePage-bg h-[90px] lg:h-[310px]' >
                <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center mx-auto gap-5 ' >
                    <div className=' h-0 lg:h-[180px]' ></div>
                    <div className='flex gap-5 text-white ' >
                        <CTAbutton active={true} linkto={"/signup"} >
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAbutton>

                        <CTAbutton active={false} linkto={"/login"}>
                            Learn More
                        </CTAbutton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7' >
                <div className=' flex flex-col lg:flex-row justify-between gap-5 h-36 mt-[80px] ' >
                    <div className=' w-[100%] lg:w-[45%]' >
                        <div className='font-inter font-semibold text-4xl text-richblack-900 ' >
                            Get the skills you need for a <HighLightedText text={"job that is in demand."} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 w-[100%] lg:w-[45%] ' >
                        <p className=' font-inter font-medium text-base text-richblack-700 ' >The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <div className='pt-9' >
                            <CTAbutton active={true} linkto={"/signup"} >
                                Learn More
                            </CTAbutton>
                        </div>
                    </div>
                </div>


            </div>
            
            {/* timeline section and learning language section */}
            <div className=' w-11/12 max-w-maxContent mx-auto mt-44 lg:mt-20 flex flex-col items-center gap-7 ' >
                {/* time line section */}
                <TimelinSection/>
                {/* learning language section */}
                <LearningLanguageSection/>
            </div>
        </div>

        {/* section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center py-24 ' >
            
            {/* instructor section */}
            <InstructorSection/>
        </div>

        {/* footer */}
        <Footer/>

    </div>
  )
}

export default Home;