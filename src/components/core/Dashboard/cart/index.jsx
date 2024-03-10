import React from 'react'
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'


const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart)

  return (
    <div className='py-10' >
        <h1 className='font-medium text-3xl text-[#F1F2FF]' >Your Cart</h1>
        <p className='font-semibold text-base text-[#6E727F] border-b border-[#6E727F] pb-2 mt-14' >{totalItems} Courses in Cart</p>

        {
            total > 0 ? 
            (
                <div className='flex flex-col-reverse lg:flex-row justify-between lg:gap-10 ' >
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ) 
            : (
                <div className='w-full flex justify-center mt-20 ' >
                    <p className='font-medium text-3xl text-[#c3c4c7]' >Your Cart is Empty.</p>
                </div>
            )
        }
    </div>
  )
}

export default Cart;