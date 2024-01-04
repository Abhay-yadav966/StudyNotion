import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png';

const TimelinSection = () => {

  const timeline = [
    {
      Logo:Logo1,
      heading:"Leadership",
      description:"Fully committed to the success company",
    },
    {
      Logo:Logo2,
      heading:"Responsibility",
      description:"Students will always be our top priority",
    },
    {
      Logo:Logo3,
      heading:"Flexibility",
      description:"The ability to switch is an important skills"
    },
    {
      Logo:Logo4,
      heading:"Solve the problem",
      description:"Code your way to a solution"
    }
  ]

  // variable used for removing the line from last node
  const line = timeline[3].heading;


  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-[76px]  items-center  ' >
            {/* left */}
            <div className='flex flex-col items-start lg:items-start lg:w-[35%]' >
              {
                timeline.map( (element, index) => {
                  return(
                    <div className='flex flex-col  ' key={index} >

                      {/* block */}
                      <div className=' flex flex-row gap-6 py-4 px-3 items-center '>

                        <div className=' w-14 h-14 rounded-full  bg-white flex items-center justify-center p-1 gap-1 shadow-[0_0_62px_0] shadow-[#0000001F] '>
                          <img src={element.Logo} alt=''/>
                        </div>


                        <div className='flex flex-col gap-[2px]  ' >
                          <h2 className='font-inter font-semibold text-lg text-richblack-800 ' >{element.heading}</h2>
                          <p className='font-normal text-sm text-richblack-700 ' >{element.description}</p>
                        </div>
                      </div>

                      {/* line */}
                      { element.heading !== line &&
                        <div className='h-11 border-l w-0 border-richblack-100 border-dotted ml-10 '></div>
                      }

                    </div>
                  )
                } )
              }
            </div>

            {/* right */}
            <div className='relative  timeLineImageBox' >
              <img src={TimelineImage} alt="" className='timeLineImage' />
              
              <div className='absolute bg-caribbeangreen-700 p-11 flex flex-col  lg:flex-row items-center gap-12 uppercase left-0 top-0 lg:top-[86%]  lg:left-[50%] lg:translate-x-[-50%] ' >
                
                {/* left */}
                <div className='flex flex-row gap-6 items-center  ' >
                  <p className='text-4xl font-bold text-white ' >10</p>
                  <p className='text-sm font-medium text-caribbeangreen-300 w-[95px] ' >YEARS EXPERIENCES</p>
                </div>

                {/* middle */}
                <div className=' hidden lg:flex border-[1px] h-10 border-caribbeangreen-500 ' ></div>

                {/* right */}
                <div className='flex flex-row items-center gap-6  ' >
                  <p className='text-4xl font-bold text-white' >250</p>
                  <p className='font-medium text-sm text-caribbeangreen-300 w-[70px] ' >TYPES OF COURSES</p>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default TimelinSection;