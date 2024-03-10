import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn'
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { MdNavigateNext } from "react-icons/md";
import {setStep, setEditCourse, setCourse} from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast';
import {updateSection, createSection} from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView';

const CourseBuilder = () => {

  const dispatch = useDispatch();

  // import data
  const {course} = useSelector( (state) => state.course );

  // state variable for button text
  const [ editSectionName, setEditSectionName] = useState(null);

  // loading
  const [loading, setLoading] = useState(false);

  // token
  const {token} = useSelector((state) => state.auth);

  // cancel button 
  const cancleEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  // importing form 
  const {
    register,
    handleSubmit,
    setValue,
    formState:{errors}
  } = useForm();

  // go to next fn.
  const goToNext = () => {
    // if does not add section and trying to go next
    if( course?.courseContent?.length === 0 ){
      toast.error("Please add atleast one section");
      return;   
    }

    // if it does not add sub section and trying to go next
    if( course?.courseContent?.some((section) => section?.subSection?.length === 0 ) ){
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    // everything is okey
    dispatch(setStep(3));
  }

  // go to back fn.
  const goToBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  // submit function
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    // if we are updating section name
    if( editSectionName ){
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      );
    }
    else{
      // now we are creating new section
      result = await createSection(
        {
          sectionName : data.sectionName,
          courseId : course._id,
        },
        token
      );
    }

    // update values
    if( result ){
      dispatch(setCourse(result));
      setEditSectionName(false);
      setValue("sectionName", "");
    }

    // set loading
    setLoading(false);
  }


  const handleChangeEditSSectionName = (sectionName, sectionId) => {

    // we are doing toogle here
    if( editSectionName === sectionName ){
      cancleEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='border border-richblack-700 bg-richblack-800 rounded-lg p-6 mt-16 mb-10 ' >
         <h3 className='font-semibold text-2xl text-richblack-5' >Course Builder</h3>
         <form onSubmit={handleSubmit(onSubmit)} >
            {/* input */}
            <div className='mt-7 mb-4 ' >
              <label className='flex flex-col gap-1' >
                <p className='text-base text-richblack-5' >Section Name <sup className='text-pink-400' > *</sup></p>
                <input 
                  type="text"
                  placeholder='Add a section to build your course'
                  {...register("sectionName", {required:true})}
                  className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '
                />


                {/* error */}
                {
                  errors.sectionName && (
                    <p>Section name is required</p>
                  )
                }
              </label>
            </div>

            {/* button */}
            <div className='flex gap-4 items-end pb-3 ' >
              <IconBtn
                type="submit"
                outline={true}
              >
                {
                  editSectionName ? "Edit Section Name " : "Create Section"
                }
                <GrAddCircle />
              </IconBtn>

              {/* cencle edit button */}
              {
                editSectionName && (
                  <button
                    type='button'
                    onClick={cancleEdit}
                    className='text-sm text-richblack-300 underline'
                  >
                    Cancle Edit
                  </button>
                )
              }
            </div>
         </form>

          {/* nested view */}
          {
            course?.courseContent?.length > 0 && (
              <NestedView handleChangeEditSSectionName = {handleChangeEditSSectionName} />
            )
          }

          {/* buttons */}
          <div className='flex mt-7 gap-3 flex-row-reverse ' >
            {/* next button */}
            <IconBtn
              type={"button"}
              onclick={goToNext}
            >
              Next
              <MdNavigateNext size={"22px"}/>
            </IconBtn>

            {/* privious button */}
            <button 
              type='button'
              onClick={goToBack}
              className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
            >
              Back
            </button>

          </div>

    </div>
  )
}

export default CourseBuilder;