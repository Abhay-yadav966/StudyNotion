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

const NestedView = ({handleChangeEditSSectionName}) => {

    const {token} = useSelector( (state) => state.auth );
    const {course} = useSelector( (state) => state.course );
    const dispatch = useDispatch();


    // flags
    const [addSubsection, setAddSubSection] = useState(null);
    const [ viewSubSection, setViewSubSection ] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    // confirmation modal
    const [confirmationModal, setConfirmationModal] = useState({});  

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
        const result = await deleteSubSection({sectionId, subSectionId}, token);

        // ....
        if( result ){
            dispatch(setCourse(result));
        }

        // closing confirmation modal
        setConfirmationModal(null);
    }

  return (
    <div>
         <div>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id}  open>
                        <summary>
                            {/* left part */}
                            <div className='flex' >
                                {/* icon and name */}
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>

                            {/* right part */}
                            <div className='flex' >

                                {/* edit button */}
                                <button
                                    type='button'
                                    onClick={() => handleChangeEditSSectionName(section.sectionName, section._id)}
                                >
                                    <MdEdit />
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
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        }
                                    )}
                                >
                                    <RiDeleteBin6Line />
                                </button>

                                
                                {/* border */}
                                <span>|</span>

                                {/* down arrow */}
                                <BiSolidDownArrow />
                                
                            </div>
                        </summary>

                        {/* subsection */}
                        <div>
                            {
                                section?.subSection.map( (subSection) => (
                                    <div key={subSection._id} onClick={() => setViewSubSection(subSection)}  >

                                        {/* left */}
                                        <div>
                                            {/* name and icon */}
                                            <RxDropdownMenu />
                                            <p>{subSection?.title}</p>
                                        </div>

                                        {/* right */}
                                        <div>
                                            {/* edit button */}
                                            <button
                                                type='button'
                                                onClick={() => setEditSubSection(subSection)}
                                            >
                                                <MdEdit />
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
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>

                        <button
                            type='button'
                            onClick={() => setAddSubSection(section._id)}
                        >
                            <MdAdd />
                            <p>Add Lecture</p>
                        </button>
                    </details>
                ))
            }
         </div>

         {/* sub section modal for add edit and delete */}
         {
            addSubsection ? (<subSectionModal modalData = {addSubsection} add={true} setModalData = {setAddSubSection} />) 

            : ( viewSubSection ? (<subSectionModal modalData={viewSubSection} setModalData = {setViewSubSection} view = {true} />) 

            : ( editSubSection ? (<subSectionModal modalData = {editSubSection} setModalData = {setEditSubSection} edit = {true} />) 
            
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