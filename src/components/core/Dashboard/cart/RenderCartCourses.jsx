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
    <div>
        {
            cart.map( (course, index) => (
                <div>
                    {/* left */}
                    <div>
                        <img src={course?.thumbnail} alt={course?.courseName} />
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor='#ffd700'
                                    emptyIcon={<FaRegStar />}
                                    filledIcon={<FaRegStar />}
                                />
                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div> 
                    </div>

                    <div>
                        <button onClick={ () => dispatch(removeFromCart(course._id))} >
                            <FiTrash2/>
                            <span>Remove</span>
                        </button>
                    </div>
                </div>
            ) )
        }
    </div>
  )
}

export default RenderCartCourses;