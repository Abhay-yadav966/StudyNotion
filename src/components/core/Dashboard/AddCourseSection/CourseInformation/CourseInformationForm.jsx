import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn'
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import {COURSE_STATUS} from '../../../../../utils/constants'
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { FaAngleRight, FaChampagneGlasses } from "react-icons/fa6";
import {setCourseCategories} from '../../../../../slices/courseSlice'

const CourseInformationForm = () => {

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  const { course, editCourse } = useSelector( (state) => state.course );

  // loading variable
  const [ loading, setLoading ] = useState(false);

  // categories
  const [ courseCategories, setCourseCategories ] = useState([]);
  
  // using useForm
  const{
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}, 
  } = useForm();

  // get categories
  const getCategories = async () => { 
    try{
      setLoading(true);
      const categories = await fetchCourseCategories();
      // set categories data into state variable and also preventing from set empty array
      if ( categories.length > 0 ){
        setCourseCategories(categories);
      }
      setLoading(false);
    }
    catch(error){
      console.log("Error occur in fetching categories course", error) 
    }
  }

  // for first render
  useEffect( () => {

    getCategories();

    if(editCourse){
      setValue("courseTitle", course?.courseName);
      setValue("courseShortDesc", course?.courseDescription);
      setValue("coursePrice", course?.price);
      setValue("courseTags", course?.tag);
      setValue("courseBenefits", course?.whatYouWillLearn);
      setValue("courseCategory", course?.category);
      setValue("courseRequirement", course?.instructions);
      setValue("courseImage", course?.thumbnail);
    }

  }, [] );


  // 
  const isFormUpdated = () => {

    const currentValues = getValues();

    if( currentValues.courseTitle !== course.courseName || currentValues.courseShortDesc !== course.courseDescription || 
       currentValues.coursePrice !== course.price || currentValues.courseTags.toString() !== course.tag.toString() || 
       currentValues.courseBenefits !== course.whatYouWillLearn || 
       currentValues.courseCategory !== course.category || currentValues.courseRequirement.toString() !== course.instructions.toString() 
       || currentValues.courseImage !== course.thumbnail 
      ){
      return true;
    }
    else{
      return false;
    }
  }

  // on submit fn
  const onSubmit = async (data) => {
  
    
    // if we are here to edit a course
    if( editCourse ){

      if( isFormUpdated() ){
        const currentValues = getValues();
  
        const formData = new FormData();
  
        formData.append("courseId", course._id);
  
        // updating formdata
        if( currentValues.courseTitle !== course.courseName ){
          formData.append("courseName", data.courseTitle);
        }
  
        if( currentValues.courseShortDesc !== course.courseDescription ){
          formData.append("courseDescription", data.courseShortDesc);
        }
  
        if( currentValues.coursePrice !== course.price ){
          formData.append("price", data.coursePrice);
        }
  
        if( currentValues.courseTags.toString() !== course.tag.toString() ){
            formData.append("tag", JSON.stringify(data.courseTags));
          }
  
        if( currentValues.courseBenefits !== course.whatYouWillLearn ){
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
  
        if( currentValues.courseCategory !== course.category ){
          formData.append("category", data.courseCategory);
        }
  
        if( currentValues.courseRequirement.toString() !== course.instructions.toString() ){
          formData.append("instructions", JSON.stringify(data.courseRequirement));
        }

        if( currentValues.courseImage !== course.thumbnail ){
          formData.append("thumbnail", data.courseImage);
        }

  
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        
        if(result){
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);

      }
      else{
        toast.error("No Changes made to the form");
      }
      return;
    }

    // create new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirement));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnail", data.courseImage);


    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if(result){
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  return (
    <div className='border border-richblack-700 bg-richblack-800 rounded-lg p-6 mt-16 mb-10 ' >
        <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-6' >
          {/* course title */}
          <label className='flex flex-col gap-1' >
            <p className='text-base text-richblack-5' >Course Title<sup className='text-pink-400' > *</sup></p>
            <input 
              name='courseTitle'
              type="text"
              placeholder='Enter Course Title'
              {...register("courseTitle",{required:true})}
              className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '
            />

            {/* if error occur*/}
            {
              errors.courseTitle && (
                <p className='text-pink-200 text-xs mt-1 pl-2 ' >Course title is required</p>
              )
            }
          </label>

          {/* course discription */}
          <label className='flex flex-col gap-1' >
            <p className='text-base text-richblack-5' >Course Short Description<sup className='text-pink-400' > *</sup></p>
            <textarea
              placeholder='Enter Description'
              {...register("courseShortDesc", {required:true})}
              className=' rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '
              rows={5}
            />

            {/* error occure */}
            {
              errors.courseShortDesc && (
                <p className='text-pink-200 text-xs mt-1 pl-2 ' >Course Description is required</p>
              )
            }
          </label>

          {/* course price */}
          <label className='relative flex flex-col gap-1'  >
            <p className='text-base text-richblack-5' >Price<sup className='text-pink-400' > *</sup></p>
            <input 
              type="text"
              placeholder='Enter Course Price'
              {...register("coursePrice",{required:true})}
              className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none pl-12'
            />
            <HiOutlineCurrencyRupee className='absolute text-richblack-400 text-2xl left-3 top-10 ' />
            {/* error */}
            {
              errors.coursePrice && (
                <p  className='text-pink-200 text-xs mt-1 pl-2 ' >Course Price is required</p>
              )
            }
          </label>

          {/* course category */}
          <label className=' flex flex-col gap-1' >
            <p className='text-base text-richblack-5' >Course Category<sup className='text-pink-400' > *</sup></p>
            <select
              defaultValue=""
              {...register("courseCategory", {required:true})}
              className=' bg-richblack-700 outline-none rounded-lg p-3 inputShadow font-medium text-base text-richblack-5 '
            >
              {/* default option for instructing select a categories */}
              <option value="" >Choose a Category</option>
              {
                !loading && courseCategories?.map( (element, index) => (
                  <option key={index} value={element?._id} >
                    {element?.name}
                  </option>
                ) )
              }
            </select>

            {/* error */}
            {
              errors.courseCategory && (
                <p className='text-pink-200 text-xs mt-1 pl-2 ' >Course Category is required</p>
              )
            }
          </label>


          {/* create a custom component for handling tags input */}
          <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          {/* create a compoment for uploading and showing preview of media */}
          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            editData={editCourse ? course?.thumbnail : null}
          />

          {/* benefits of the course */}
          <label className=' flex flex-col gap-1' >
            <p className='text-base text-richblack-5' >Benefits of the course<sup className='text-pink-400' > *</sup></p>
            <textarea
              placeholder='Enter Benefits of the course'
              {...register("courseBenefits", {required:true})}
              className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '
              rows={5}
            />

            {/* error */}
            {
              errors.courseBenefits && (
                <p className='text-pink-200 text-xs mt-1 pl-2 ' >Benefits of the course is required</p>
              )
            }
          </label>

          {/* Requirement field */}
          <RequirementField
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            name="courseRequirement"
            setValue={setValue}
            getValues={getValues}
          />

          {/* buttons */}

          <div className='flex justify-end gap-2 ' >

            {
              editCourse && (
                <button
                  type='button'
                  onClick={() => dispatch(setStep(2))}
                  disabled={loading}
                  className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
                >
                  Continue Wihout Saving
                </button>
              )
            }

            <IconBtn type='submit' >
              { editCourse ? "Save Changes" : "Next" } <FaAngleRight/>
            </IconBtn>
          </div>

        </form>
    </div>
  ) 
}

export default CourseInformationForm;