import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Table, Tbody, Th, Thead, Tr, Td, } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants'
import ConfirmationModal from '../../../common/ConfirmationModal';
import {deleteCourse, fetchInstructorCourses, fetchCourseDetails} from '../../../../services/operations/courseDetailsAPI'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../../../../services/formatDate"


const CoursesTable = ({ courses, setCourses }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [ loading, setLoading ] = useState(false);
    const [ confirmationModal, setConfirmationModal ] = useState(null);

    // delete course fn.
    const courseDeleteHandler = async (courseId) => {
      setLoading(true);
      // here we are deleting specific course
      await deleteCourse({courseId}, token );

      // now course id deleted and we are fetching all updated courses
      const result = await fetchInstructorCourses(token);

      if(result){
        setCourses(result);
      }

      setConfirmationModal(null);

      setLoading(false);
    }


    // Edit course fn
    const handleEditCourse = async (courseId) => {
      setLoading(true);
      const result = await fetchCourseDetails(courseId);
      if(result){
        dispatch(setCourse(result));
        dispatch(setEditCourse(true));
        navigate("/dashboard/edit-course");
      }
      setLoading(false);
    }

  return (
    <div>
        <Table className='rounded-xl border border-richblack-800' >
          <Thead>
            <Tr className=' flex items-center justify-start gap-9 py-2 px-8 border-b border-richblack-800  ' >
              <Th className='font-medium text-sm text-richblack-100 w-[70%] text-start ' >
                COURSES
              </Th>
              <Th className='font-medium text-sm text-richblack-100' >
                DURATION
              </Th>
              <Th className='font-medium text-sm text-richblack-100' >
                PRICE
              </Th>
              <Th className='font-medium text-sm text-richblack-100' >
                ACTIONS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              courses.length === 0 ? (
                <Tr className='flex items-center justify-center py-10 ' >
                    <Td className='text-richblack-5 text-2xl font-medium' >
                        No Courses Found
                    </Td>
                </Tr>
              ) : (
                courses?.map((course) => (
                  <Tr key={course._id}  className="flex items-center gap-x-9 border-b border-richblack-800 p-8 " >
                      {/* left */}
                      <Td className="flex gap-x-4 w-[70%] " >
                          <img src={course?.thumbnail} 
                            className='h-[150px] w-[220px] rounded-lg object-cover '
                          />
                          <div className='flex flex-col gap-3 justify-between ' >
                            <p className='font-semibold text-xl text-richblack-5' >{course?.courseName}</p>
                            <p className='font-normal text-sm text-richblack-400' >{course?.courseDescription}</p>
                            <p className='font-medium text-sm text-richblack-25' >Created: {formatDate(course.createdAt)}</p>
                            {
                              course.status === COURSE_STATUS.DRAFT ? (
                                <div className='py-1 px-2 flex gap-2 rounded-2xl bg-richblack-700 items-center w-fit ' >
                                  <MdOutlineAccessTimeFilled  size={"14px"} className='text-pink-50' />
                                  <p className='font-semibold text-[12px] text-pink-100' >Drafted</p>
                                </div>
                              ) : (
                                <div className='py-1 px-2 flex gap-2 rounded-2xl bg-richblack-700 items-center w-fit ' >
                                  <FaCheckCircle size={"14px"} className='text-yellow-100' />
                                  <p className='font-semibold text-[12px] text-yellow-100' >Published</p>
                                </div>
                              )
                            }
                          </div>
                      </Td>

                      {/* right */}
                      <Td className='font-medium text-sm text-richblack-100 w-[7%] ' >
                        2h 30min
                      </Td>

                      <Td>
                        <span className='font-medium text-sm text-richblack-100' >₹{course.price}</span>
                      </Td>

                      <Td className=' ml-2 flex gap-2' >
                        <button
                          type='button'
                          disabled={loading}
                          onClick={ () => handleEditCourse(course._id) }
                        >
                          <MdEdit size={'22px'} className='text-richblack-400' />
                        </button>

                        <button
                          disabled={loading}
                          onClick={() => setConfirmationModal({
                            heading:"Do you want to delete this course?",
                            subHeading:"All the data related to this course will be deleted",
                            btn1Handler: !loading ? ( () => courseDeleteHandler(course._id) ) : (() => {}),
                            btn1Text:"Delete",
                            btn2Handler:() => setConfirmationModal(null),
                            btn2Text:"Cancel"
                          })}
                        >
                          <MdDelete size={'22px'} className='text-richblack-400' />
                        </button>
                      </Td>
                  </Tr>
                ) )
              )
            }
          </Tbody>
        </Table>
        { confirmationModal && <ConfirmationModal modalData = {confirmationModal}  /> }
    </div>
  )
}

export default CoursesTable;