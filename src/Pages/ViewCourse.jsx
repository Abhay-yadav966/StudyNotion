import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import { setCourseSectionData, setEntireCourseData, setCompletedLectures, setTotalNoOfLectures} from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';

const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(null);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setCourseSpecificDetails = async (courseId) => {
    const courseData = await getFullDetailsOfCourse(courseId, token);

    if( courseData ){
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData?.completedVideos));
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((section) => {
          lectures = lectures + section?.subSection.length;
        })
        dispatch(setTotalNoOfLectures(lectures));
    }
  }

  // it will run on first render
  useEffect(() => {
    setCourseSpecificDetails(courseId);
  }, []);

  return (
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div>
          <div>
            <Outlet/>
          </div>
        </div>

        { reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> }
    </div>
  )
}

export default ViewCourse;