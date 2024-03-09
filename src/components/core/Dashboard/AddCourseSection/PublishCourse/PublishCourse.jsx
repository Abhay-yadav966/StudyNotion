import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState , setStep} from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";


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
  const navigate = useNavigate();

  // fetching data from slices
  const { token} = useSelector( (state) => state.auth );
  const { course} = useSelector( ( state) => state.course );
  const [ loading, setLoading] = useState(false);

  // goToCourse fn
  const goToCourses = () => {
    dispatch( resetCourseState() );
    navigate("/dashboard/my-courses");
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
    <div className='rounded-lg border border-[#2C333F] p-6 bg-[#161D29] flex flex-col gap-6 mt-16 ' >
        {/* heading */}
        <p className='font-semibold text-2xl text-[#F1F2FF]' >Publish Course</p>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8' >
          <label className='flex gap-2 items-center' >
            <input 
              type='checkbox'
              {...register("public")}
              className=' text-[#585D69] h-4 w-4 rounded bg-richblack-500 '
            />
            <span className='ml-2 font-medium text-base text-[#6E727F] ' >Make this Course as Public</span>
          </label>
        

          {/* buttons */}
          <div className='flex items-center justify-end gap-x-4  w-full ' >
            <button
              type='button'
              disabled={loading}
              onClick={() => dispatch(setStep(2))}
              className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
            >
              <IoIosArrowBack />
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