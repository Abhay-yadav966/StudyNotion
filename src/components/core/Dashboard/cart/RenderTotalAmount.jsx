import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn'

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);
        //TODO: API integrate -> payment gateway tak leke jaegi
    }

  return (
    <div className='rounded-lg border border-[#2C333F] p-6 bg-[#161D29] flex flex-col gap-1 min-w-[282px] ' >
        <p className='font-semibold text-sm text-[#999DAA]' >Total:</p>
        <p className='font-semibold text-2xl text-[#FFD60A]' >₹ {total}</p>
        <div className='mt-5' >
          <button 
              onClick={handleBuyCourse}
              className=' text-[16px] px-5 py-2 rounded-lg font-semibold text-black bg-yellow-50 w-full  '
          >
            Buy Now
          </button>
        </div>
    </div>
  )
}

export default RenderTotalAmount;