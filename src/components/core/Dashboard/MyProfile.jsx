import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn'
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    // fetching the user data from slice
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    
  return (
    <div className='flex flex-col gap-14 pt-10 pb-20 ' >
        {/* heading */}
        <h1 className='font-medium text-3xl text-richblack-5 ' >My Profile</h1>

        <div className='flex flex-col gap-10' >

            {/* section 1 */}
            <div className='flex justify-between items-center bg-richblack-800 border border-richblack-700 rounded-lg p-8' >
                {/* left */}
                <div className='flex gap-6 items-center ' >
                    <img src={user?.image} alt={`Profile-${user?.firstName}`}  className='w-20 aspect-square object-cover rounded-full ' />
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
            <div className=' flex flex-col gap-6 bg-richblack-800 border border-richblack-700 rounded-lg p-8' >
                {/* upper */}
                <div className='flex justify-between items-center ' >
                    <p className='font-semibold text-lg text-richblack-5' >About</p>
                    <IconBtn onclick={() => navigate("/dashboard/settings")}  >
                        Edit <FaRegEdit />
                    </IconBtn>
                </div>

                {/* lower */}
                <div>
                    { user?.additionDetails?.about ? (<p className='font-normal text-sm text-richblack-300' >{user?.additionDetails?.about}</p>) : (<p className='font-normal text-sm text-richblack-300' >Write Something About Yourself</p>) }
                </div>
            </div>

            {/* section 3 */}
            <div className=' flex flex-col gap-10 bg-richblack-800 border border-richblack-700 rounded-lg p-8' >
                {/* heading and button */}
                <div className='flex justify-between items-center' >
                    <p className='text-richblack-5 font-semibold text-lg' >Personal Details</p>
                    <IconBtn onclick={() => navigate("/dashboard/settings")}  >
                        Edit <FaRegEdit />
                    </IconBtn>
                </div>

                {/* details */}
                <div className='flex items-center gap-48' >
                    <div className=' flex flex-col gap-5 ' >
                        {/* first name */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >First Name</p>
                            <p className='text-richblack-5 font-semibold text-sm' >{user?.firstName}</p>
                        </div>

                        {/* email */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >Email</p>
                            <p className='text-richblack-5 font-semibold text-sm' >{user?.email}</p>
                        </div>

                        {/* gender */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >Gender</p>
                            {user?.additionDetails?.gender ? (<p className='text-richblack-5 font-semibold text-sm' >{user?.additionDetails?.gender}</p>) : (<p className='text-richblack-5 font-semibold text-sm' >Add Gender</p>) }
                        </div>


                        
                    </div>

                    <div className='flex flex-col gap-5' >
                        
                        {/* last name */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >Last Name</p>
                            <p className='text-richblack-5 font-semibold text-sm' >{user?.lastName}</p>
                        </div>

                        {/* phone number */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >Phone Number</p>
                            {user?.additionDetails?.contactNumber ? (<p className='text-richblack-5 font-semibold text-sm' >{user?.additionDetails?.contactNumber}</p>) : (<p className='text-richblack-5 font-semibold text-sm' >Add Contact Number</p>)}
                        </div>

                        {/* DOB */}
                        <div className='flex flex-col gap-2' >
                            <p className='font-normal text-sm text-richblack-600' >Date Of Birth</p>
                            { user?.additionDetails?.dateOfBirth ? (<p className='text-richblack-5 font-semibold text-sm' >{user?.additionDetails?.dateOfBirth}</p>) : (<p className='text-richblack-5 font-semibold text-sm' >Add Date Of Birth</p>)}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile;

