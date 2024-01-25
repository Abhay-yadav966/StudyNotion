import React from 'react'
import { FiTrash2 } from "react-icons/fi";
import {deleteProfile} from '../../../../services/operations/SettingsAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handle delete fn.
    const handleDelete = () => {
        dispatch(deleteProfile(token, navigate));
    }

  return (
    <div className='rounded-lg border border-pink-700 bg-pink-900 flex gap-6 p-8 px-12 ' >
        {/* image */}
        <div className='bg-pink-700 rounded-full h-14 w-14 flex items-center justify-center aspect-square ' >
            <FiTrash2 fontSize="32px" className='text-pink-200' />
        </div>

        {/* content */}
        <div className='flex flex-col items-start gap-2 ' >
            <h3 className='font-bold text-lg text-pink-5 ' >Delete Account</h3>
            <div className=' w-[60%]' >
                <p className='font-medium text-base text-pink-25' >Would you like to delete account?</p>
                <p className='font-medium text-base text-pink-25' >This account contains Paid Courses. Deleting your account  is permanent and  will remove all the contain associated with it.</p>
            </div>

            <button onClick={handleDelete} className='font-medium italic text-lg text-pink-300  ' >
                I want to delete my account.
            </button>
        </div>
    </div>
  )
}

export default DeleteAccount;