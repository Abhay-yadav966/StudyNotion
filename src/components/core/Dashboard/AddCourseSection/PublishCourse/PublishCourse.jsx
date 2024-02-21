import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';


const PublishCourse = () => {

  // On first render
  useEffect( () => {
    if( course?.status === COURSE_STATUS.PUBLISHED ){
      setValue("public", true);
    }
  } ); 

  // form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm();


  const dispatch = useDispatch();

  // fetching data from slices
  const { token} = useSelector( (state) => state.auth );
  const { course, setStep} = useSelector( ( state) => state.course );
  const [ loading, setLoading] = useState(false);

  // goToCourse fn
  const goToCourses = () => {
    dispatch( resetCourseState() );
    //  todo navigate to the course show
  }
  
  // submit fn.
  const onSubmit = async () => {
     if( course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || course.status === COURSE_STATUS.DRAFT && getValues("public") === false ){
        // no updation in form
        // no need to make api call
        goToCourses();
        return;
     }

    //  if course is edit
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails( formData, token );

    if( result ){
      goToCourses();
    }

    setLoading(false);

  }

  return (
    <div>
        {/* heading */}
        <p>Publish Course</p>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} >
          <label>
            <input 
              type='checkbox'
              {...register("public")}
            />
            <span>Make this Course Public</span>
          </label>
        

          {/* buttons */}
          <div>
            <button
              type='button'
              disabled={loading}
              onClick={() => dispatch(setStep(2))}
            >
              Back
            </button>

            <IconBtn
              disabled={loading}
            >
              Save Changes
            </IconBtn>
            
          </div>
        </form>
    </div>
  )
}

export default PublishCourse;