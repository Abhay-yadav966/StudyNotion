import React from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import GetAvgRating from '../utils/avgRating';
import {fetchCourseDetails} from '../services/operations/courseDetailsAPI'
import RatingStars from '../components/common/RatingStars';
import { IoInformationCircleOutline } from "react-icons/io5";
import { formatDate } from '../services/formatDate';
import { CiGlobe } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import CourseDetailsCart from '../components/core/Course/CourseDetailsCart'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";



const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetching data from url
  const {courseId} = useParams();

  // state variable for course details
  const [ courseData, setCourseData ] = useState(null);

  // rating and reviews
  const [ avgReviewCount, setAvgReviewCount ] = useState(0);

  // state variable for total Length
  const [totalLength, setTotalLength] = useState(0);

  // state variable for length of subsection
  const [ subSectionLength, setSubSectionLength ] = useState(0);

  // state variable for 

  // function for calculating the length of the subsection
  const findSubSectionLength = () => {
    let length = 0;
    
    courseData?.courseContent?.map((element) => (
      length = length + element.subSection.length
    ))

    return length;
  }

  useEffect(() => {
    const length = findSubSectionLength();
    setSubSectionLength(length);
  }, [courseData])


  // function for calculating the total time durations of all lecture
  const findAllLecturesDuration = () => {
    let length = 0;

    courseData?.courseContent?.forEach((section) => {
      section?.subSection?.forEach((subSection) => {
        length = length + parseInt(subSection?.timeDuration);
      })
    })

    return length;

  }

  useEffect(() => {
    const duration = findAllLecturesDuration();
    setTotalLength(duration);
  }, [courseData]);

  // buy button handler
  const handleBuyCourse = () => {
    if( token ){
      buyCourse(token, [courseId], user, navigate, dispatch); 
      return;
    }
  }


  // fn
  const getCourseDetails = async (courseId) => {
    try{
      const result = await fetchCourseDetails(courseId);
  
      if(result){
        setCourseData(result);
      }
    }
    catch(error){
      console.log("Error in fetching course details ", error);
    }
  }

  // fetching data on 1st rendering
  useEffect(() => {
    console.log("value of course id", courseId);
    getCourseDetails(courseId);
  }, [courseId]);


  // calling avg review fn in utils
  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);

  return (
    <div>
        <div className='bg-richblack-800' >
          <div className='w-11/12 max-w-maxContent mx-auto ' >
            {/* left */}
            <div className='flex flex-col gap-3 py-28 max-w-[770px] ' >
              {/* course name */}
              <h1 className='font-bold text-5xl text-richblack-5' >{courseData?.courseName}</h1>
              {/* course description */}
              <p className='font-medium text-lg text-richblack-300' >{courseData?.courseDescription}</p>
              {/* course rating */}
              <div className='flex flex-row gap-2 items-center ' >
                <span className='font-semibold text-lg text-yellow-100' >{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={"24px"} />
                <span className='font-normal text-lg text-richblack-25' >({courseData?.ratingAndReviews.length} reviews)</span>
                <p className='font-normal text-lg text-richblack-25' >{courseData?.studentEnrolled.length} students enrolled</p>
              </div>
              {/* instructor name */}
              <p className='font-normal text-lg text-richblack-25' >Created by {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}</p>
              {/* time of creating and language */}
              <div className='flex items-center gap-5 ' >
                <div className='flex items-center gap-2 ' >
                  <IoInformationCircleOutline size={"20px"} className='text-richblack-25' />
                  <p className='font-normal text-lg text-richblack-25 ' >Created at {formatDate(courseData?.createdAt)}</p> 
                </div>

                <div className='flex items-center gap-2 ' >
                  <CiGlobe size={"20px"} className='text-richblack-25' />
                  <p className='font-normal text-lg text-richblack-25' >English</p>
                </div>
              </div>
            </div>

            {/* right */}
            <div>
              <CourseDetailsCart course={courseData} paymentHandler = {handleBuyCourse} />
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className='w-11/12 max-w-maxContent mx-auto py-10 flex flex-col gap-10 ' >
            <div className='border border-[#2C333F] max-w-[770px] p-8 flex flex-col gap-4 ' >
              <h2 className='font-semibold text-3xl text-richblack-5' >What you'll learn</h2>
              <p className='font-medium text-base text-[#C5C7D4] ' >{courseData?.whatYouWillLearn}</p>
            </div>

            <div className='flex flex-col gap-2' >
              <h2 className='font-semibold text-3xl text-richblack-5' >Course Content</h2>
              <div>
                <div className='flex gap-2 items-center' >
                  <p className='font-medium text-base text-richblack-25' >{courseData?.courseContent?.length} sections</p>
                  <GoDotFill className='font-medium text-base text-richblack-25' />
                  <p className='font-medium text-base text-richblack-25' >{subSectionLength} lectures</p>
                  <GoDotFill className='font-medium text-base text-richblack-25' />
                  <p className='font-medium text-base text-richblack-25' >{totalLength}s total length</p>
                </div>

                {/* all collapse button */}

              </div>

              <div>
                {
                  courseData?.courseContent?.map((section) => (
                    <details key={section._id} open={false} >
                      <summary>
                        {/* left */}
                        <div>
                         
                        </div>

                        {/* right */}
                        <div>

                        </div>
                      </summary>
                    </details>
                  ))
                } 
              </div>
            </div>
        </div>
    </div>
  )
}

export default CourseDetails;