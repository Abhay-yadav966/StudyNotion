import React from 'react'
import HighLightedText from '../components/core/HomePage/HighLightedText';
import BannerImg1 from '../assets/Images/aboutus1.webp'
import BannerImg2 from '../assets/Images/aboutus2.webp'
import BannerImg3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactUsSection from '../components/core/AboutPage/ContactUsSection';
import Footer from '../components/common/Footer'




const About = () => {
  return (
    <div>
        {/* section 1 */}
        <div className='bg-richblack-800  ' >

            <div className=' relative flex flex-col items-center gap-12 w-11/12 max-w-maxContent mx-auto pt-20' >
                {/* headings and text */}
                <div className='flex flex-col gap-2 items-center w-[100%] lg:w-[70%] text-center ' >
            
                    {/* heading */}
                    <h1 className='text-richblack-5 font-semibold text-4xl  ' >Driving Innovation in Online Education for a <HighLightedText text={"Brighter Future"} /></h1>

                    {/* sub heading */}
                    <p className='font-medium text-lg text-richblack-300' >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>

                {/* spaces for img */}
                <div className=' h-10 sm:h-28 lg:h-[215px]' ></div>

                {/* images */}
                <div className=' absolute flex gap-6 mx-auto -bottom-24' >
                    <img src={BannerImg1} className='w-[33%]' />
                    <img src={BannerImg2} className='w-[33%]' />
                    <img src={BannerImg3} className='w-[33%]' />
                </div>
            </div>
        </div>

        {/* section 2 */}
        <div className='w-11/12 max-w-maxContent mx-auto mt-40 mb-20 text-richblack-5 text-center ' >
            <p className='font-semibold text-xl md:text-4xl' >We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightedText text={"combines technology"} />, <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819] ' >expertise</span>, and community to create an <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00] to-[#F9D423] ' >unparalleled educational experience.</span></p>
        </div>

        {/* border */}
        <div className='border-b border-richblack-700' ></div>

        {/* section 3 */}
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-32 lg:gap-60 py-24 ' >
            {/* upper wala div */}
            <div className='flex flex-col lg:flex-row gap-28 items-center justify-between ' >
                {/* left */}
                <div className='flex flex-col gap-6 w-[100%] lg:w-[43%] ' >
                    <h1 className='font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] ' >Our Founding Story</h1>
                    <p className='font-medium text-base text-richblack-300' >Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='font-medium text-base text-richblack-300' >As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>

                {/* right */}
                <div className='relative' >
                    <img src={FoundingStory} alt=""/>
                    <div className=' absolute top-0 -left-10 bg-gradient-to-br from-[#EC008C] to-[#FC6767]  w-[70%] h-[80%]  opacity-20 blur-2xl rounded-full  ' ></div>
                </div>
            </div>

            {/* nicha wala div */}
            <div className='flex flex-col gap-32 lg:flex-row items-center justify-between  ' >
                {/* left */}
                <div className='flex flex-col gap-6 w-[100%] lg:w-[40%] ' >
                    <h1 className='font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-[#E65C00] to-[#F9D423]' >Our Vision</h1>
                    <p className='font-medium text-base text-richblack-300 ' >With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                {/* right */}
                <div className='flex flex-col gap-6 w-[100%] lg:w-[40%] ' >
                    <h1 className='font-semibold text-4xl ' > <HighLightedText text={"Our Mission"} /> </h1>
                    <p className='font-medium text-base text-richblack-300 ' >our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </div>

        {/* section 4 */}
        <div className='bg-richblack-800 py-10 ' >
            <div className='w-[78%] mx-auto ' >
                <Stats/>
            </div>
        </div>

        {/* section 5 */}
        <LearningGrid/>
        
        {/* section 6 */}
        <ContactUsSection/> 

        {/* rating and review */}


        {/* footer */}
        <Footer/>

    </div>
  )
}

export default About;