import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import {removeFromCart} from "../../../../slices/cartSlice"

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);

    const dispatch = useDispatch();

  return (
    <div className='w-full'>
        {
            cart.map( (course, index) => (
                <div key={index} className='flex justify-between border-b border-[#6E727F] py-10' >
                    {/* left */}
                    <div className='flex flex-col md:flex-row gap-4' >
                        <img src={course?.thumbnail} alt={course?.courseName} width={"225px"} height={"150px"} className='rounded-lg object-cover object-center ' />
                        <div className='flex flex-col gap-2  ' >
                            <p className='font-medium text-lg text-[#F1F2FF] ' >{course?.courseName}</p>
                            <p className='font-normal text-base text-[#838894]' >{course?.category?.name}</p>
                            <div className='flex items-center gap-2' >
                                <span className='font-semibold text-base text-[#E7C009]' >4.8</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor='#ffd700'
                                    emptyIcon={<FaRegStar />}
                                    filledIcon={<FaRegStar />}
                                />
                                <span className='font-normal text-base text-[#6E727F]' >{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div> 
                    </div>

                    <div className='flex flex-col gap-2 items-end ' >
                        <button onClick={ () => dispatch(removeFromCart(course._id))} className='flex items-center p-3 gap-2 rounded-lg border border-[#2C333F] bg-[#161D29] ' >
                            <FiTrash2 size={"18px"} className='text-[#EF476F]' />
                            <span className='font-medium text-base text-[#EF476F]' >Remove</span>
                        </button>
                        <p className='font-semibold text-2xl text-[#FFD60A]' >₹ {course?.price}</p>
                    </div>
                </div>
            ) )
        }
    </div>
  )
}

export default RenderCartCourses;