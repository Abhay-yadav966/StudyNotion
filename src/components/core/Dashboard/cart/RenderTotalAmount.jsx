import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn'
import {buyCourse} from '../../../../services/operations/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        
        if(token){
          buyCourse(token, courses, user, navigate, dispatch);
        }

    }

  return (
    <div className='rounded-lg border border-[#2C333F] p-6 bg-[#161D29] flex flex-col gap-1 max-w-[282px] min-w-[282px] mt-10 h-fit ' >
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