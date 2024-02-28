import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Pagination , Autoplay, Navigation} from 'swiper/modules'

import Course_Card from './Course_Card';

const CourseSlider = ({courses}) => {
  return (
    <div>
         {
            courses?.length ? (
              <Swiper
                loop={true}
                slidesPerView={1}
                spaceBetween={25}
                modules={[Pagination, Autoplay, Navigation]}
                pagination={true}
                className='mySwiper'
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                breakpoints={{
                  1024:{slidesPerView:3}
                }}
              >
                {
                  courses?.map((course, index) => (
                    <SwiperSlide key={index} > 
                      <Course_Card course={course} slider={true} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            ) : (
                <p>No Course Found</p>
            )
         }
    </div>
  )
}

export default CourseSlider;