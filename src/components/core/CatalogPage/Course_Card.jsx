import React from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars'
import { useState, useEffect } from 'react';
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course, slider}) => {

    const [ avgReviewCount, setAvgReviewCount ] = useState(0);

    // use Effect
    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

  return (
    <div>
        <Link to={`/courses/${course?._id}`} >
            <div className={`flex flex-col gap-5`} >
                {/* image */}
                <div>
                    <img src={course?.thumbnail} alt="course thumbnail" className={` ${slider ? "h-[250px] " : "h-[400px] "} w-full rounded-xl object-cover`} />
                </div>
                <div className='flex flex-col gap-2' >
                    <p className='font-medium text-xl text-richblack-5' >{course?.courseName}</p>
                    <p className='font-medium text-sm text-richblack-300' >{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className='flex items-center gap-2 ' >
                        <span className='text-base font-semibold text-yellow-100' >{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className='font-normal text-base text-richblack-400' >{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className='font-semibold text-xl text-richblack-5' ><span className='font-medium' >Rs.</span> {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card;