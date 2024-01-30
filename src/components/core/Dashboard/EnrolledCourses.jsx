import React, { useEffect, useState } from 'react'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';

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
    }, [] );

  return (
    <div>
        <h1 className='font-medium text-3xl text-richblack-5' >Enrolled Courses</h1>

        {
            enrolledCourses ? (
                enrolledCourses.length ? (
                    <div>
                        {/* headings */}
                        <div>
                            <p>Course Name</p>
                            <p>Durations</p>
                            <p>Progress</p>
                        </div>

                        {/* cards */}
                        <div>
                            {
                                enrolledCourses.map( (element, index) => (
                                    
                                        <div key={index} >
                                            {/* image in left */}
                                            <img src={element.thumbnail} alt={element?.courseName} />
                                            <div>
                                                <p>{element.courseName}</p>
                                                <p>{element.courseDescription}</p>
                                            </div>

                                            <div>
                                                {element?.totalDuration}
                                            </div>

                                            <div>
                                                <p>Progress : {element.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                    completed={element.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>
                                        </div>
                                    
                                ) )
                            }
                        </div>
                    </div>
                ) 
                : (
                    <div>
                        You have not enrolled in any course yet.
                    </div>
                )
            )
            : (
                <div>
                    Loading...
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses;