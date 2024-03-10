import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [ activeStatus, setActiveStatus ] = useState("");
  
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
    <div className='min-w-[320px] max-w-[350px]  bg-[#161D29] h-full  border-r-[1px] border-r-richblack-700 ' >
        {/* upper part for heading and buttons */}
         <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 ' >

            {/* buttons */}
            <div className='flex w-full items-center justify-between' >
              <button
                type='button'
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className=' flex items-center justify-center h-[35px] w-[35px] rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90  '
              >
                <IoMdArrowRoundBack size={30} />
              </button>

              <IconBtn
                onclick={() => setReviewModal(true)}
              >
                Add Review
              </IconBtn> 
            </div>

            {/* headings */}
            <div className='flex flex-col ' >
              <p className='font-bold text-lg text-[#DBDDEA]' >{courseEntireData?.courseName}</p>
              <p className='text-base font-semibold text-richblack-500' >{completedLectures?.length} / {totalNoOfLectures}</p>
            </div>
         </div>

         {/* for sections and sub section */}
         <div className='cursor-pointer' >
            {
              courseSectionData?.map((section) => (
               <div key={section?._id}
                  className='py-2'
                >
                  {/* section name and arrow */}
                  <div onClick={() => setActiveStatus(section?._id)} 
                    className='py-4 px-5 bg-[#2C333F] flex items-center justify-between ' 
                  >
                    {/* section name */}
                    <p className='font-semibold text-base text-[#F1F2FF]' >{section?.sectionName}</p>
                    {/* up and down arrow */}
                    <div>
                      {
                        activeStatus === section?._id ? <MdOutlineKeyboardArrowUp size={"25px"} className='text-[#999DAA]' /> : <IoIosArrowDown size={"25px"} className='text-[#999DAA]' />
                      }
                    </div>
                  </div>

                  {/* subsection data */}
                  {
                    activeStatus === section?._id && (
                      <div className='' >
                        {
                          section?.subSection?.map((subSectionData) => (
                            <div key={subSectionData?._id}
                              onClick={
                                () => navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSectionData?._id}`)
                              }
                              className={` flex gap-3 px-5 py-2 ${subSectionId === subSectionData?._id ? ("bg-yellow-200 font-semibold text-richblack-800") : ("hover:bg-richblack-900")} `}
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