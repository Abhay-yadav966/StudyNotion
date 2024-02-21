import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RenderSteps from '../AddCourseSection/RenderSteps'

const EditCourse = () => {

    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);

  return (
    <div>
        <h1>Edit Course</h1>
        <div>
            {
                course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse;