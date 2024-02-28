import React from 'react'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { IoIosAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {

    const {token} = useSelector( (state) => state.auth );
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if( result ){
            setCourses(result);
        }
    }
    // first render
    useEffect( () => {
        fetchCourses();
    }, []);

  return (
    <div className='pb-10' >
        <div className='flex items-center justify-between py-11  ' >
            <h1 className='font-medium text-3xl text-richblack-5 ' >My Courses</h1>
            <IconBtn 
                onclick={() => navigate("/dashboard/add-course")}
            >
                Add Courses
                <IoIosAdd size={"25px"} />
            </IconBtn>
        </div>

        {/* courses details */}
        {
            courses && <CoursesTable courses={courses} setCourses={setCourses} />
        }
    </div>
  )
}

export default MyCourses;