import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {ReactStars} from 'react-rating-stars-component'
import IconBtn from '../../common/IconBtn';
import {createRating} from '../../../services/operations/courseDetailsAPI'

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
    <div>
        <div>
            {/* heading */}
            <div>
                <h4>Add Review</h4>
                {/* icon */}
                <button>

                </button>
            </div> 

            <div>
                <div>
                    <img src={user?.image} alt="user Image" />
                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    
                    <label>
                        <p>Add Your Experience</p>
                        <textarea
                            placeholder='Add Your Experience'
                            {...register("courseExperience", {required:true})}

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
                    <div>
                        <button
                            type='button'
                            onClick={() => setReviewModal(false)}
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