import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState,useEffect } from 'react';
import ReactStars from 'react-rating-stars-component'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Pagination , Autoplay, Navigation} from 'swiper/modules'
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
    <div>
      <h2></h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        pagination={true}
        navigation={true}
        className='mySwiper'
        autoplay = {{
          delay:2500,
        }}
        modules={[ Autoplay, Navigation, Pagination ]}
        breakpoints={{
          1024:{slidesPerView:4}
        }}
      >
        {
          reviews?.map((review, index) => (
            <SwiperSlide key={index} >
              <div>
                {/* image and name */}
                <div>
                  <img src={review?.user?.image} alt="Profile Picture" />
                  <div>
                    <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                    <p>{review?.course?.courseName}</p>
                  </div>
                </div>

                {/* review */}
                <p>{review?.review.split(" ").slice(0, truncateWords).join(" ")}</p>

                {/* rating and stars */}
                <div>
                  <p>{review?.rating}</p>
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