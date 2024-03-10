import React, { useEffect, useState } from 'react'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link, json } from 'react-router-dom';

const EnrolledCourses = () => {

    // token
    const {token} = useSelector((state) => state.auth);

    // state variable for storing data that is coming from the backend
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error){
            console.log("error occure at triggering the get user enrolled courses", error);
        }
    }

    // calling the function that will triger the function which will fetch the data from the backend
    useEffect( () => {
        getEnrolledCourses();
    },[]);

  return (
    <div className='py-10 flex flex-col gap-10 ' >
        <h1 className='font-medium text-3xl text-richblack-5' >Enrolled Courses</h1>

        {
            enrolledCourses ? (
                enrolledCourses.length ? (
                    <div className='border-x border-[#2C333F] rounded-t-lg ' >
                        {/* headings */}
                        <div className='rounded-t-lg p-4 bg-[#2C333F] flex items-center ' >
                            <p className='font-medium text-base text-[#C5C7D4] w-2/4 ' >Course Name</p>
                            <p className='font-medium text-base text-[#C5C7D4] w-1/3' >Durations</p>
                            <p className='font-medium text-base text-[#C5C7D4]' >Progress</p>
                        </div>

                        {/* cards */}
                        <div>
                            {
                                enrolledCourses.map( (element, index) => (
                                        <Link to={`/view-course/${element?._id}/section/${element?.courseContent[0]?._id}/sub-section/${element?.courseContent[0]?.subSection[0]?._id}`}>
                                            <div key={index} className='border-b border-[#2C333F] p-4 flex items-center'  >
                                                {/* image in left */}
                                                <div className='w-2/4 flex' >
                                                    <img src={element.thumbnail} alt={element?.courseName} height={"52px"} width={"52px"} className='rounded-lg object-cover aspect-square ' />
                                                    <div className='ml-5' >
                                                        <p className='font-medium text-base text-[#F1F2FF]' >{element?.courseName}</p>
                                                        <p className='font-normal text-base text-[#838894]' >{element?.courseDescription}</p>
                                                    </div>
                                                </div>

                                                <div className='w-1/3' > 
                                                    <p className='font-medium text-base text-[#C5C7D4]' >
                                                        {
                                                            /* total duration */
                                                            <p>{element?.totalDuration}</p>
                                                        }
                                                    </p>
                                                </div>

                                                <div className='flex flex-col gap-1' >
                                                    <p className='font-semibold text-sm text-[#C5C7D4]' >Progress : {element?.progressPercentage || 0}%</p>
                                                    <ProgressBar
                                                        completed={element?.progressPercentage || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    
                                ) )
                            }
                        </div>
                    </div>
                ) 
                : (
                    <div className='flex items-center justify-center p-20 ' >
                        <p className='font-medium text-3xl text-[#c3c4c7]' >
                            You have not enrolled in any course yet.
                        </p>
                    </div>
                )
            )
            : (
                <div className='flex items-center justify-center p-20 ' >
                    <p className='font-medium text-3xl text-[#c3c4c7]' >Loading...</p>
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses;