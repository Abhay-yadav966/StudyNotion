import React from 'react'


const LearningGridBox = ({heading, subHeading, active}) => {
  return (
    <div className={`flex flex-col gap-8 p-8 w-[294px] h-[294px] ${ active ? "bg-richblack-700" : "bg-richblack-800" } `} >
        <h1 className='font-semibold text-lg text-richblack-5 ' >{heading}</h1>
        <p className='font-normal text-base text-richblack-100 ' >{subHeading}</p>
    </div>
  )
}

export default LearningGridBox;