import React from 'react';
import CTAbutton from './CTAbutton';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subHeading, ctabtn1, ctabtn2, codeblock,  codecolor, 
}) => {

  return (
    <div className={`flex ${position} flex-col lg:flex-row my-20 justify-between gap-10`} >

        {/* section 1 */}
        <div className='flex flex-col w-[100%] lg:w-[50%] gap-8' >
            {/* heading */}
            <div className='font-semibold text-4xl' >
                {heading}
            </div>
            {/* subHeading */}
            <div className='text-richblack-300 font-bold w-[83%] ' >
                {subHeading}
            </div>
            {/*  */}
            <div className='flex gap-7 mt-7' >
                <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                    <div className='flex gap-2 items-center' >
                        {ctabtn1.btntext}
                        <FaArrowRight/>
                    </div>
                </CTAbutton>

                <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                    {ctabtn2.btntext}
                </CTAbutton>
            </div>
        </div>

        {/* section 2 */}
        <div className=' codeBorder relative flex flex-row  bg-[#111E3261] py-4 lg:w-[500px]  ' >
            {/* background add krna h */}
            <div className={`absolute top-[-5%] left-[-5%]  w-[70%] h-[80%] opacity-20 blur-2xl rounded-[100%] bg-gradient-to-r ${ codecolor === "text-yellow-25"? "from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]" : "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" }`} ></div>

            {/* numbers */}
            <div className='font-bold font-inter text-richblack-400 w-[10%] flex flex-col items-center' >
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            {/* code */}
            <div className={`w-[90%] font-mono font-bold flex flex-col gap-2 ${codecolor} pr-2 `} >
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks;