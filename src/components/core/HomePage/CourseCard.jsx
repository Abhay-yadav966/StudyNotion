import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const courseCard = ({ courseData, currentCard, setCurrentCard }) => {
    
  // on click function
  const selectedCard = ( heading ) => {
    setCurrentCard(heading);
  }


  return (
    <div className={`${courseData.heading === currentCard? " bg-white selectedCardColor " : " bg-richblack-800"}  cursor-pointer w-[90%]  `} onClick={ () => selectedCard(courseData.heading) } >

    {/* top */}
      <div className='flex flex-col gap-3 px-6 pt-8 ' >
        <h2 className={`font-semibold text-xl font-inter ${ courseData.heading === currentCard? "text-richblack-800" : "text-richblack-25" } `} >{courseData.heading}</h2>
        <p className={`text-lg font-normal font-inter lg:h-[180px] ${ courseData.heading === currentCard? "text-richblack-500" : "text-richblack-400 "} `} >{courseData.description}</p>
      </div>

    {/*bottom*/}
      <div className={`flex flex-row gap-4 items-center justify-between py-4 px-6 border-t-2 border-dashed ${courseData.heading === currentCard? "border-richblack-500 " : "border-richblack-600 "}  `} >
        {/* left */}
        <div className={`flex flex-row gap-2 items-center ${courseData.heading === currentCard? "text-blue-300":"text-richblack-300"}  text-lg`} >
          <HiUsers />
          <p className=' font-medium font-inter' >{courseData.level}</p>
        </div>
        {/* right */}
        <div className={`flex flex-row gap-2 items-center ${ courseData.heading === currentCard? "text-blue-300" : "text-richblack-300" }  `} >
          <ImTree />
          <p className='text-lg' >{courseData.lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  )
}

export default courseCard;