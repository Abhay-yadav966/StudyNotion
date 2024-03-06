import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [ activeStatus, setActiveStatus ] = useState("");
    console.log("Value of active status ->", activeStatus);
    // const [ videoBarActive, setVideoBarActive ] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);


    const setActiveFlags = () => {
      if( !courseSectionData.length ){
        return;
      }

      // section index
      const currentSectionIndex = courseSectionData?.findIndex( (data) => data._id === sectionId )

      // set current section here
      setActiveStatus(courseSectionData[currentSectionIndex]?._id);
    }

    useEffect(() => {
      setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <div>
        {/* upper part for heading and buttons */}
         <div>
            {/* buttons */}
            <div>
              <button
                type='button'
                onClick={() => navigate("/dashboard/enrolled-courses")}
              >
                Back
              </button>

              <IconBtn
                onclick={() => setReviewModal(true)}
              >
                Add Review
              </IconBtn>
            </div>

            {/* headings */}
            <div>
              <p>{courseEntireData?.courseName}</p>
              <p>{completedLectures?.length}/{totalNoOfLectures}</p>
            </div>
         </div>

         {/* for sections and sub section */}
         <div>
            {
              courseSectionData?.map((section) => (
               <div key={section?._id} >
                  {console.log("value of section id ->", section?._id)}
                  <div onClick={() => setActiveStatus(section?._id)} className='bg-white' >
                    {/* section name */}
                    <p>{section?.sectionName}</p>
                    {/* up and down arrow */}
                    <div>
                      {
                        activeStatus === sectionId ? <MdOutlineKeyboardArrowUp /> : <IoIosArrowDown />
                      }
                    </div>
                  </div>

                  {/* subsection */}
                  {
                    activeStatus === section?._id && (
                      <div>
                        {
                          section?.subSection?.map((subSectionData) => (
                            <div key={subSectionData?._id}
                              onClick={
                                () => navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSectionData?._id}`)
                              }
                             >
                              {/* checkbox */}
                              <input type="checkbox" checked={completedLectures?.includes(subSectionData?._id)} />
                              <p>{subSectionData?.title}</p>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
               </div>
              ))
            }
         </div>
    </div>
  )
}

export default VideoDetailsSidebar;