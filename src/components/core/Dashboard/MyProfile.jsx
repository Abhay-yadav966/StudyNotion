import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    // fetching the user data from slice
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    console.log(user);
  return (
    <div className='flex flex-col gap-14' >
        {/* heading */}
        <h1 className='font-medium text-3xl text-richblack-5 ' >My Profile</h1>

        <div className='flex flex-col gap-5' >

            {/* section 1 */}
            <div className='flex justify-between items-center bg-richblack-800 border border-richblack-700 rounded-lg p-6' >
                {/* left */}
                <div className='flex gap-6 items-center ' >
                    <img src={user?.image} alt={`Profile-${user?.firstName}`}  className='w-20 rounded-full ' />
                    <div className='flex flex-col gap-1' >
                        <p className='font-semibold text-lg text-richblack-5' >{user?.firstName + " " + user?.lastName}</p>
                        <p className='font-normal text-sm text-richblack-300' >{user?.email}</p>
                    </div>
                </div>

                {/* right */}
                <IconBtn onclick={() => navigate("/dashboard/settings")}  >
                    Edit <FaRegEdit />
                </IconBtn>
            </div>

            {/* section 2 */}
            <div className='' >
                {/* upper */}
                <div>
                    <p>About</p>
                    <IconBtn onclick={() => navigate("/dashboard/settings")}  >
                        Edit <FaRegEdit />
                    </IconBtn>
                </div>

                {/* lower */}
                <div>
                    { user?.additionDetails?.about ? (<p>{user?.additionDetails?.about}</p>) : (<p>Write Something About Yourself</p>) }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile;