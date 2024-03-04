import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const VideoDetailsSidebar = () => {

    const [ activeStatus, setActiveStatus ] = useState("");
    const [ videoBarActive, setVideoBarActive ] = useState("");
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

  return (
    <div>
         
    </div>
  )
}

export default VideoDetailsSidebar;