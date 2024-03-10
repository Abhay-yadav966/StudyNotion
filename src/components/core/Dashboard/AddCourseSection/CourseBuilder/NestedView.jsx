import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import {deleteSection, deleteSubSection} from '../../../../../services/operations/courseDetailsAPI'
import {setCourse} from '../../../../../slices/courseSlice'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import SubSectionModal from './SubSectionModal';

const NestedView = ({handleChangeEditSSectionName}) => {

    const {token} = useSelector( (state) => state.auth );
    const {course} = useSelector( (state) => state.course ); 
    const dispatch = useDispatch();


    // flags
    const [addSubsection, setAddSubSection] = useState(null);
    const [ viewSubSection, setViewSubSection ] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    

    // confirmation modal
    const [confirmationModal, setConfirmationModal] = useState(null);  

    // delete section
    const handleDeleteSection = async (sectionId) => {
        const courseId = course._id;
        const result = await deleteSection({sectionId, courseId}, token);

        // updating course
        if(result){
            dispatch(setCourse(result));
        }

        // closing confirmation modal
        setConfirmationModal(null);
    }

    // delete sub Section
    const handleDeleteSubSection = async (sectionId, subSectionId) => {
        const courseId = course._id;
        const result = await deleteSubSection({sectionId, subSectionId, courseId}, token);

        // ....
        if( result ){
            dispatch(setCourse(result));
        }

        // closing confirmation modal
        setConfirmationModal(null);
    }

  return (
    <div className='  mt-5 border border-richblack-600 rounded-lg p-8 bg-richblack-700 ' >
         <div className='flex flex-col gap-5' >
            {
                course?.courseContent?.map((section) => (
                    <details key={section?._id}  open>
                        <summary className='list-none pb-1 cursor-pointer flex justify-between items-center border-b-2 border-richblack-600' >
                            {/* left part */}
                            <div className='flex items-center gap-3 ' >
                                {/* icon and name */}
                                <RxDropdownMenu size={"30px"} className='text-richblack-50' />
                                <p className='font-semibold text-base text-richblack-50' >{section?.sectionName}</p>
                            </div>

                            {/* right part */}
                            <div className='flex gap-3 items-center' >

                                {/* edit button */}
                                <button
                                    type='button'
                                    onClick={() => handleChangeEditSSectionName(section?.sectionName, section?._id)}
                                    className='text-richblack-400'
                                >
                                    <MdEdit size={"20px"}/>
                                </button>

                                {/* delete button */}
                                <button
                                    type='button'
                                    onClick={() => setConfirmationModal(
                                        {
                                            heading:"Delete this Section",
                                            subHeading:"All the lecture in this section will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => handleDeleteSection(section?._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        }
                                    )}
                                    className='text-richblack-400'
                                >
                                    <RiDeleteBin6Line size={"20px"} />
                                </button>

                                
                                {/* border */}
                                <span className='text-richblack-400 text-2xl' >|</span>

                                {/* down arrow */}
                                <BiSolidDownArrow size={"15px"} className='text-richblack-400' />
                                
                            </div>
                        </summary>

                        {/* subsection */}
                        <div className='py-3 px-6 flex flex-col gap-3 ' >
                            {
                                section?.subSection?.map( (subSection) => (
                                    <div className='border-b-2 border-richblack-600 flex items-center justify-between cursor-pointer ' key={subSection?._id} onClick={() => setViewSubSection(subSection)}  >

                                        {/* left */}
                                        <div className='flex gap-2 items-center ' >
                                            {/* name and icon */}
                                            <RxDropdownMenu size={"30px"} className='text-richblack-50' />
                                            <p className='font-semibold text-base text-richblack-50 ' >{subSection?.title}</p>
                                        </div>

                                        {/* right */}
                                        <div onClick={(e) => e.stopPropagation()} className=' flex gap-2 items-center ' >
                                            {/* edit button */}
                                            <button
                                                type='button'
                                                onClick={() => setEditSubSection(subSection)}
                                                className='text-richblack-400'
                                            >
                                                <MdEdit size={"20px"} />
                                            </button>

                                            {/* delete button */}
                                            <button
                                                type='button'
                                                onClick={() => setConfirmationModal({
                                                    heading:"Delete this Sub Section",
                                                    subHeading:"Selected lecture will be deleted",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler : () => handleDeleteSubSection(section._id, subSection._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })}
                                                className='text-richblack-400'
                                            >
                                                <RiDeleteBin6Line size={"20px"} />
                                            </button>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>

                        <button
                            type='button'
                            onClick={() => setAddSubSection(section._id)}
                            className='flex items-center gap-1 mt-3 ml-5 '
                        >
                            <MdAdd size={"24px"} className='text-yellow-50 font-bold ' />
                            <p className='font-semibold text-base text-yellow-50' >Add Lecture</p>
                        </button>
                    </details>
                ))
            }
         </div>

         {/* sub section modal for add edit and delete */}
         {
            addSubsection ? (<SubSectionModal modalData = {addSubsection} add={true} setModalData = {setAddSubSection} />) 
            : ( viewSubSection ? (<SubSectionModal modalData={viewSubSection} setModalData = {setViewSubSection} view = {true} />) 

            : ( editSubSection ? (<SubSectionModal modalData = {editSubSection} setModalData = {setEditSubSection} edit = {true} />) 
            
            : (<div></div>) ) )
         }

         {/* confirmation modal */}
         {
            confirmationModal && (
                <ConfirmationModal  modalData = {confirmationModal} />
            )
         }
    </div>
  )
}

export default NestedView;