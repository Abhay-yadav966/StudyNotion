import React from 'react'
import IconBtn from '../../common/IconBtn';

const CourseDetailsCart = ({course, paymentHandler}) => {
    return (
    <div className='rounded-lg' >
        <img src={course?.thumbnail} alt="Course thumbnail" />
        <div>
          <p>{course?.price}</p>
          <div>
            {/* add to cart button */}
            <button
              type='button'
              
            >

            </button>
          </div>
        </div>
    </div>
  )
}

export default CourseDetailsCart;