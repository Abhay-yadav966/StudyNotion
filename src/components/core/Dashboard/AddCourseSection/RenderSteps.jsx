import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilder from './CourseInformation/CourseBuilder'
import PublishCourse from './CourseInformation/PublishCourse';

const RenderSteps = () => {

  // fetching data
  const {step} = useSelector((state) => state.course);
  console.log("value of step", step)

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
    <div>
      {/* stages */}
      <div>
        {
          steps.map((element) => (
            <div key={element.id} >
              {/* number */}
              <div className={`${ element.id === step ? "" : ""}`} >
                {
                  step > element.id ? (<FaCheck />) : (element.id)
                }
              </div>

              {/* dashed line */}
              {
                element.id !== 3 && (
                  <div></div>
                )
              }
            </div>
          ))
        }
      </div>

      {/* titles */}
      <div>
        {
          steps.map( (element, index) => (
            <p key={index} >{element.title}</p>
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