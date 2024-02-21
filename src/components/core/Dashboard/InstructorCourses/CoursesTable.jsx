import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Table, Tbody, Th, Thead, Tr, Td, } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants'
import ConfirmationModal from '../../../common/ConfirmationModal';
import {deleteCourse, fetchInstructorCourses, fetchCourseDetails} from '../../../../services/operations/courseDetailsAPI'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

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
        <Table>
          <Thead>
            <Tr>
              <Th>
                COURSES
              </Th>
              <Th>
                DURATION
              </Th>
              <Th>
                PRICE
              </Th>
              <Th>
                ACTIONS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              courses.length === 0 ? (
                <Tr>
                    <Td>
                        No Courses Found
                    </Td>
                </Tr>
              ) : (
                courses?.map((course) => (
                  <Tr key={course._id}  className="flex gap-x-10 border-richblack-800 p-8 " >
                      {/* left */}
                      <Td className="flex gap-x-4" >
                          <img src={course?.thumbnail} 
                            className='h-[150px] w-[220px] rounded-lg object-cover '
                          />
                          <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.courseDescription}</p>
                            <p>Created: {}</p>
                            {
                              course.status === COURSE_STATUS.DRAFT ? (
                                <div>
                                  <p>DRAFTED</p>
                                </div>
                              ) : (
                                <div>
                                  <p>PUBLISHED</p>
                                </div>
                              )
                            }
                          </div>
                      </Td>

                      {/* right */}
                      <Td>
                        2h 30min
                      </Td>

                      <Td>
                        <span>₹{course.price}</span>
                      </Td>

                      <Td>
                        <button
                          type='button'
                          disabled={loading}
                          onClick={ () => handleEditCourse(course._id) }
                        >
                          Edit
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
                          Delete
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