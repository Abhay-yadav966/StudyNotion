import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component'
import IconBtn from '../../common/IconBtn';
import {createRating} from '../../../services/operations/courseDetailsAPI'
import { RxCross1 } from "react-icons/rx";

const CourseReviewModal = ({setReviewModal}) => {

    // fetch user data from profile slice
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);

    // useForm hook
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm();

    // fn on first render
    useEffect( () => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    // rating changed Function
    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    // on submit fn
    const onSubmit = async (data) => {
        await createRating({
            courseId:courseEntireData?._id,
            rating:data.courseRating,
            review:data.courseExperience,
        }, token);

        // closing modal 
        setReviewModal(false);
    }

  return (
    <div className='absolute w-[700px] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ' >
        <div className='border border-richblack-200 rounded-lg ' >
            {/* heading */}
            <div className='flex items-center px-6 py-4 justify-between bg-[#2C333F] border-b border-[#DBDDEA] rounded-t-lg ' >
                <h4 className='font-semibold text-base text-[#F1F2FF]' >Add Review</h4>
                {/* icon */}
                <button
                    type='button'
                    onClick={() => setReviewModal(false)}
                >
                    <RxCross1 size={"18px"} className='text-[#C5C7D4]' />
                </button>
            </div> 

            <div className='bg-[#161D29] px-12 py-6 flex flex-col items-center gap-7 rounded-b-lg  ' >
                <div className='flex gap-3' >
                    <img src={user?.image} alt="user Image" height={"52px"} width={"52px"} className='object-cover rounded-full ' />
                    <div>
                        <p className='font-semibold text-base text-[#F1F2FF]' >{user?.firstName} {user?.lastName}</p>
                        <p className='font-normal text-sm text-[#F1F2FF]' >Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center  w-full' >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    
                    <label className='w-full flex flex-col gap-2 ' >
                        <p className='font-medium text-base text-[#F1F2FF]' >Add Your Experience <span className='text-pink-200 text-base' > *</span> </p>
                        <textarea
                            placeholder='Add Your Experience'
                            {...register("courseExperience", {required:true})}
                            rows={4}
                            className='rounded-lg bg-[#424854] p-3 font-medium text-base text-white outline-none  '
                            
                        />

                        {/* error */}
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </label>

                    {/* buttons */}
                    <div className='flex gap-2 justify-end w-full mt-6' >
                        <button
                            type='button'
                            onClick={() => setReviewModal(false)}
                            className='rounded-lg px-6 py-3 bg-[#424854] font-semibold text-base text-black '
                        >
                            Cancel
                        </button>

                        <IconBtn
                            type='submit'
                        >
                            Save
                        </IconBtn>
                    </div>
                    
                </form>
            </div>
        </div>

    </div>
  )
}

export default CourseReviewModal;