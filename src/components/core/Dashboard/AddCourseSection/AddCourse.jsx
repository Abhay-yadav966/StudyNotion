import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='flex flex-col xl:flex-row text-richblack-5 w-full items-start gap-6 mt-10 ' >
        <div className=' w-[100%] xl:w-[58%] flex flex-col gap-14 '>
            <h1 className='text-3xl font-medium' >Add Course</h1>
            <div>
                <RenderSteps/>
            </div>
        </div>

        {/* tips */}
        <div className=' hidden xl:flex flex-col gap-8 border border-richblack-700 bg-richblack-800 rounded-lg p-6  max-w-[400px] sticky top-10  ' >
            <h1 className='font-semibold text-lg  ' >⚡Course Upload Tips</h1>
            <ul className='flex flex-col gap-4 font-medium text-xs list-disc pl-6' >
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
  )
}

export default AddCourse ;