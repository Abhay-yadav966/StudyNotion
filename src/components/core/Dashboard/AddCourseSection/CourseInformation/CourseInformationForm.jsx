import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCourseCategories} from '../../../../../services/operations/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField';

const CourseInformationForm = () => {

  const dispatch = useDispatch();

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
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirement", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

  }, [] );

  return (
    <div>
        <form>
          {/* course title */}
          <label>
            <p>Course Title<sup>*</sup></p>
            <input 
              type="text"
              placeholder='Enter Course Title'
              {...register("courseTitle",{required:true})}
              className=''
            />

            {/* if error occur*/}
            {
              errors.courseTitle && (
                <p>Course title is required</p>
              )
            }
          </label>

          {/* course discription */}
          <label>
            <p>Course Short Description<sup>*</sup></p>
            <textarea
              placeholder='Enter Description'
              {...register("courseShortDesc", {required:true})}
              className=''
            />

            {/* error occure */}
            {
              errors.courseShortDesc && (
                <p>Course Description is required</p>
              )
            }
          </label>

          {/* course price */}
          <label>
            <p>Price<sup>*</sup></p>
            <input 
              type=""
              placeholder='Enter Price'
              {...register("coursePrice",{required:true})}
              className=''
            />
            <HiOutlineCurrencyRupee />
            {/* error */}
            {
              errors.coursePrice && (
                <p>Course Price is required</p>
              )
            }
          </label>

          {/* course category */}
          <label>
            <p>Course Category<sup>*</sup></p>
            <select
              defaultValue=""
              {...register("courseCategory", {required:true})}
              className='w-full bg-black '
            >
              {/* default option for instructing select a categories */}
              <option value="" >Choose a Category</option>
              {
                !loading && courseCategories.map( (element, index) => (
                  <option key={index} value={element?._id} >
                    {element?.name}
                  </option>
                ) )
              }
            </select>

            {/* error */}
            {
              errors.courseCategory && (
                <p>Course Category is required</p>
              )
            }
          </label>


          {/* create a custom component for handling tags input */}
          {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          /> */}

          {/* create a compoment for uploading and showing preview of media */}
          {/* <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          /> */}

          {/* benefits of the course */}
          <label>
            <p>Benefits of the course<sup>*</sup></p>
            <textarea
              placeholder='Enter Benefits of the course'
              {...register("courseBenefits", {required:true})}
              className=''
            />

            {/* error */}
            {
              errors.courseBenefits && (
                <p>Benefits of the course is required</p>
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

        </form>
    </div>
  ) 
}

export default CourseInformationForm;