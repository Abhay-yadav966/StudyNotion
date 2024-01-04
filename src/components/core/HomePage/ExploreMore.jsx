import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighLightedText from './HighLightedText';
import CourseCard from './CourseCard'


const ExploreMore = () => {

  const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
  ]

  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setCart = (value) => {
    // changing tab 
    setCurrentTab(value);

    // changing courses acc. to tab

    const result = HomePageExplore.filter( (element) => ( element.tag === value ) );

    setCourses(result[0].courses);

    // changing current Card
    setCurrentCard(result[0].courses[0].heading);

  }

  return (
    <div className='  flex flex-col gap-9 mt-20 ' >

      {/* heading */}
      <div className=' flex flex-col gap-2 items-center ' >
            <h1 className='font-semibold text-4xl font-inter text-richblack-5 ' >Unlock the <HighLightedText text={"Power of Code"} /></h1>
            <p className='font-medium text-lg font-inter text-richblack-300' >Learn to Build Anything You Can Imagine</p>
      </div>

      {/* tabBar */}
      <div className=' hidden lg:flex flex-row items-center gap-2 rounded-full px-1 py-1 bg-richblack-800 font-inter border-b-[1px] border-[#FFFFFF2E] ' >
            {
                tabName.map( (element, index) => {
                    return(
                        <div key={index} className={`text-base font-inter text-richblack-200
                                                    ${ currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium "
                                                    :" bg-richblack-800 " } hover:bg-richblack-900 hover:font-medium hover:text-richblack-5 py-2 px-7 rounded-full transition-all duration-200 cursor-pointer `} 
                             onClick={() => setCart(element) }
                        >
                            {element}
                        </div>
                    )
                } )
            }
      </div>

      <div className='lg:h-[180px]' ></div>

      {/* course card ka group */}
      <div className=' lg:absolute left-0 -bottom-36 flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-16 items-center justify-between pb-7 lg:pb-0' >
          {
            courses.map( (element, index) => {
                return(
                  <CourseCard key={index} 
                    courseData={element}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                  />
                )
            } )
          }
      </div>

    </div>
  )
}

export default ExploreMore;