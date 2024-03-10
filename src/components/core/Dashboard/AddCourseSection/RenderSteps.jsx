import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilder from './CourseBuilder/CourseBuilder'
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

  // fetching data
  const {step} = useSelector((state) => state.course);

  // creating data for using map fn.
  const steps = [
    {
      id:1,
      title:"Course Information"
    },
    {
      id:2,
      title:"Course Builder"
    },
    {
      id:3,
      title:"Publish"
    }
  ] 

  return (
    <div className='w-full' >
      {/* stages */}
      <div className='flex justify-between w-[500px] mx-auto ' >
        {
          steps.map((element) => (
            <div className='flex items-center ' key={element.id} >
              {/* number */}
              <div className={`${ element.id === step ? "border-yellow-50 bg-yellow-900 font-semibold " : "border-richblack-700 bg-richblack-800 font-normal text-richblack-300 "} aspect-square rounded-full border h-9 w-9 flex justify-center items-center  text-lg
                                ${element.id < step ? "bg-yellow-50" : ""} `} >
                {
                  step > element.id ? (<FaCheck  color='black'/>) : (element.id)
                }
              </div>

              {/* dashed line */}
              {
                element.id !== 3 && (
                  <div className={` ${ step > element.id ? "border-yellow-50" : "border-richblack-600" } border-t-2 border-dashed border-richblack-600 w-[200px] `} ></div>
                )
              }
            </div>
          ))
        }
      </div>

      {/* titles */}
      <div className='flex gap-32 select-none mt-2  mx-auto w-[550px] ' >
        {
          steps.map( (element, index) => (
            <div key={index} className='min-w-[129px]  ' >
              <p className={` ${step >= element.id ? "text-richblack-5" : " text-richblack-200 "} text-sm font-medium`} >{element.title}</p>
            </div>
          ) )
        }
      </div>

      {/* form for step 1 */}
      {
        step === 1 && (<CourseInformationForm/>)
      }

      {/* page for step 2 */}
      {
        step === 2 && (<CourseBuilder/>)
      }

      {/* page for step 3 */}
      {
        step === 3 && (<PublishCourse/>)
      }

    </div>
  )
}

export default RenderSteps;