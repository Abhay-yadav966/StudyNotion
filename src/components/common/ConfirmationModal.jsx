import React from 'react'
import IconBtn from './IconBtn';

const ConfirmationModal = ({modalData}) => {
    
  return (
    <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 absolute right-[37%] top-[40%] ' >
        <p className='text-2xl font-semibold text-richblack-5 ' >{modalData.heading}</p>
        <p className='mt-3 mb-5 leading-6 text-richblack-200' >{modalData.subHeading}</p>
        <div className='flex items-center gap-4' >
            <IconBtn onclick={modalData.btn1Handler} >
                {modalData.btn1Text}
            </IconBtn>

            <button className='rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900' onClick={modalData.btn2Handler} >
                {modalData.btn2Text}
            </button>
        </div>
    </div>
  )
}

export default ConfirmationModal;