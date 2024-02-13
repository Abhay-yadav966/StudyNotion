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
    <div>
         <h3>Course Builder</h3>
         <form onSubmit={handleSubmit(onSubmit)} >
            {/* input */}
            <div>
              <label>
                <p>Section Name <sup>*</sup></p>
                <input 
                  type="text"
                  placeholder='Add a section to build your course'
                  {...register("sectionName", {required:true})}
                  className=''
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
            <div className='flex gap-4 items-end' >
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
          <div className='flex' >
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
            >
              Back
            </button>

          </div>

    </div>
  )
}

export default CourseBuilder;