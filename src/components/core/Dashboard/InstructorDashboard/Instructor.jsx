import React, { useState ,useEffect } from 'react'
import {fetchInstructorCourses} from '../../../../services/operations/courseDetailsAPI'
import {getInstructorData} from '../../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom'

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

    let totalAmount = 0;

    const findTotalAmount = () => {
        instructorData?.forEach( (data) => {
            totalAmount = totalAmount + data?.totalAmountGenerated;
        } );
    }

    // fn for calculating total enrolled student

    let totalStudents = 0;

    const findTotalStudents = () => {
        instructorData?.forEach((data) => {
            totalStudents = totalStudents + data?.totalStudentsEnrolled;
        })
    }
    
    // calculating total amount and total student
    useEffect(() => {
        findTotalAmount();
        findTotalStudents();
    }, [instructorData])

  return (
    <div className='py-10' >
        <div className='flex flex-col gap-2' >
            <h2 className="text-2xl font-bold text-richblack-5" >Hi {user?.firstName} 👋</h2>
            <p className="font-semibold text-richblack-200" >Let's start something new</p>
        </div>

        {
            loading ? (<div className='spinner' ></div>) 
            : (
                courses.length > 0 
                ?(
                    <div>
                        <div className="my-4 flex h-fit space-x-4 " >

                            {/* Render Chart and graph */}
                            <InstructorChart courses={instructorData} />

                            {/* Statistics */}
                            <div className="flex min-w-[250px] h-fit flex-col rounded-md bg-richblack-800 p-6" >
                                <p className="text-lg font-bold text-richblack-5" >Statistics</p>
                                <div>
                                    <p className="text-lg text-richblack-200" >Total Courses</p>
                                    <p className="text-3xl font-semibold text-richblack-50" >{courses.length}</p>
                                </div>

                                <div>
                                    <p className="text-lg text-richblack-200" >Total Students</p>
                                    <p className="text-3xl font-semibold text-richblack-50" >{totalStudents} students</p>
                                </div>

                                <div>
                                    <p className="text-lg text-richblack-200" >Total Income</p>
                                    <p className="text-3xl font-semibold text-richblack-50" >{totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        {/* courses */}
                        <div className="rounded-md bg-richblack-800 p-6" >
                            <div className="flex items-center justify-between" >
                                <p className="text-lg font-bold text-richblack-5" >Your Courses</p>
                                <Link to={"/dashboard/my-courses"}>
                                    <p className="text-xs font-semibold text-yellow-50" >View all</p>
                                </Link>
                            </div>

                            <div className="my-4 flex items-start space-x-6" >
                                {
                                    courses?.slice(0, 3)?.map((course) => (
                                        <div key={course._id} className="w-1/3" >
                                            <img src={course?.thumbnail} alt="" className="h-[201px] w-full rounded-md object-cover" />
                                            <div className="mt-3 w-full" >
                                                <p className="text-sm font-medium text-richblack-50" >{course?.courseName}</p>
                                                <div className="mt-1 flex items-center space-x-2" >
                                                    <p className="text-xs font-medium text-richblack-300" >{course?.studentEnrolled?.length} students</p>
                                                    <p className="text-xs font-medium text-richblack-300" >|</p>
                                                    <p className="text-xs font-medium text-richblack-300" >Rs. {course?.price}</p>
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
                    <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20" >
                        <p className="text-center text-2xl font-bold text-richblack-5" >You have not created any courses yet</p>
                        <Link to={"/dashboard/add-course"} >
                            <p className='mt-1 text-center text-lg font-semibold text-yellow-50' >Create a Course</p>
                        </Link>
                    </div>
                )
            )
        }
    </div>
  )
}

export default Instructor;