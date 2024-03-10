import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState,useEffect } from 'react';
import ReactStars from 'react-rating-stars-component'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/free-mode"

import { Pagination , Autoplay, Navigation} from 'swiper/modules';
import { apiConnector } from '../../services/apiconnector';

import { ratingsEndPoints } from '../../services/apis'

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    // fn
    const fetchAllReviews = async () => {
      try{
        const response = await apiConnector("GET", ratingsEndPoints.REVIEWS_DETAILS_API)

        if( response.data.success ){
          setReviews(response?.data?.allRatingReview);
          console.log("Rating and review data -> ", response?.data?.allRatingReview);
        }
      }
      catch(err){
        console.log("Error in fatching Rating and reviews", err);
      } 
    }

    useEffect(() => {
        fetchAllReviews();
    }, [])

  return (
    <div className='w-full mt-10 ' >
      <h2 className=' text-white text-4xl font-semibold text-center mb-20 ' >Reviews from other learners</h2>
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={25}
        modules={[ Autoplay, Navigation, Pagination ]}
        pagination={true}
        className='mySwiper'
        autoplay={{
          delay:2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          450:{slidesPerView:2},
          650:{slidesPerView:3},
          1024:{slidesPerView:4},
        }}
      >
        {
          reviews?.map((review, index) => (
            <SwiperSlide key={index} >
              <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25" >
                {/* image and name */}
                <div className="flex items-center gap-4" >
                  <img src={review?.user?.image} alt="Profile Picture" className="h-9 w-9 rounded-full object-cover" />
                  <div className="flex flex-col" >
                    <p className='font-semibold text-richblack-5' >{review?.user?.firstName} {review?.user?.lastName}</p>
                    <p className="text-[12px] font-medium text-richblack-500" >{review?.course?.courseName}</p>
                  </div>
                </div>

                {/* review */}
                <p className="font-medium text-richblack-25" >{review?.review.split(" ").slice(0, truncateWords).join(" ")}</p>

                {/* rating and stars */}
                <div className="flex items-center gap-2 " >
                  <p  className="font-semibold text-yellow-100" >{review?.rating}</p>
                  <ReactStars
                    count={5}
                    value={review?.rating}
                    size={20}
                    edit={false}
                    activeColor={'#ffd700'}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ReviewSlider;