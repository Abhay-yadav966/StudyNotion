import React, { useState ,useEffect } from 'react'
import {fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import {getInstructorData} from '../../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'

const Instructor = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    const [ loading, setLoading ] = useState(false);
    const [ instructorData, setInstructorData] = useState(null);
    const [ courses, setCourses ] = useState([]); 

    const getCourseDataWithStats = async () => {
        setLoading(true);

        // pending
        const instructorApiData = await getInstructorData(token);

        const result = await fetchInstructorCourses(token);

        if(instructorApiData.length){
            setInstructorData(instructorApiData);
        }

        if(result){
            setCourses(result);
        }

        setLoading(false);    
    }

    useEffect(() => {
        getCourseDataWithStats();
    }, [])

    // fn for calculating total amount

    const totalAmount = 0;

    const findTotalAmount = () => {
        instructorData.forEach( (data) => {
            totalAmount = totalAmount + data?.totalAmountGenerated;
        } );
    }

    // fn for calculating total enrolled student

    const totalStudents = 0;

    const findTotalStudents = () => {
        instructorData.forEach((data) => {
            totalStudents = totalStudents + data?.totalStudentsEnrolled;
        })
    }
    
    // calculating total amount and total student
    useEffect(() => {
        findTotalAmount();
        findTotalStudents();
    }, [instructorData])

  return (
    <div>
        <div>
            <h2>Hi {user?.firstName}</h2>
            <p>Let's start something new</p>
        </div>

        {
            loading ? (<div className='spinner' ></div>) 
            : (
                courses.length > 0 
                ?(
                    <div>
                        <div>
                            <InstructorChart instructorData={instructorData} />
                            <div>
                                <p>Statistics</p>
                                <div>
                                    <p>Total Courses</p>
                                    <p>{courses.length}</p>
                                </div>

                                <div>
                                    <p>Total Students</p>
                                    <p>{totalStudents} students</p>
                                </div>

                                <div>
                                    <p>Total Income</p>
                                    <p>{totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        {/* courses */}
                        <div>
                            <div>
                                <p>Your Courses</p>
                                <Link to={"/dashboard/my-courses"}>
                                    <p>View all</p>
                                </Link>
                            </div>

                            <div>
                                {
                                    courses?.slice(0, 3)?.map((course) => (
                                        <div>
                                            <img src={course?.thumbnail} alt="" />
                                            <div>
                                                <p>{course?.courseName}</p>
                                                <div>
                                                    <p>{course?.studentEnrolled?.length}</p>
                                                    <p>|</p>
                                                    <p>Rs. {course?.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : 
                (
                    <div>
                        <p>You have not created any courses yet</p>
                        <Link to={"/dashboard/add-course"} >
                            Create a Course
                        </Link>
                    </div>
                )
            )
        }
    </div>
  )
}

export default Instructor;