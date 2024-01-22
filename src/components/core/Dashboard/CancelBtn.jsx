import React from 'react'
import { useNavigate } from 'react-router-dom';

const CancelBtn = () => {

    const navigate = useNavigate();

  return (
    <button onClick={ () => navigate("/dashboard/my-profile") } className='font-semibold text-base text-richblack-100 bg-richblack-800 py-2 px-6 rounded-lg' >
        Cancel
    </button>
  )
}

export default CancelBtn;