import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {createSubSection, updateSubSection} from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn';
import Upload from '../Upload'
import toast from 'react-hot-toast';

// here i have mark value of add, view and edit value by default false.
const SubSectionModal = ({ modalData, setModalData, add = false,  view = false, edit = false }) => {

    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false);

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const {  
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();

    useEffect(() => {
        if( view || edit ){
            setValue("lectureTitle", modalData?.title);
            setValue("lectureDesc", modalData?.description);
            setValue("lectureVideo", modalData?.videoUrl);
        }
    }, [])

    const formUpdated = () => {
        const currentValues = getValues();

        if( currentValues.lectureTitle !== modalData?.title || currentValues.lectureDesc !== modalData?.description || currentValues.lectureVideo !== modalData?.lectureVideo ){
            return true;
        }
        else{
            return false;
        }
    }

    // submit fn.
    const onSubmit = async (data) => {
        
        // if user wants to edit then this submit fn. will render & in case of (view) this fn. will not render
        if( edit ){
            if(formUpdated){
                const currentValues = getValues();

                const formData = new FormData();

                formData.append("subSectionId", modalData?._id);
                formData.append("courseId", course._id );

                if( currentValues.lectureTitle !== modalData?.title  ){
                    formData.append("title", data.lectureTitle);
                }

                if( currentValues.lectureDesc !== modalData?.description ){
                    formData.append("description", data.lectureDesc);
                }

                if( currentValues.lectureVideo !== modalData?.videoUrl ){
                    formData.append("video", data.lectureVideo);
                }

                setLoading(true);

                // api call
                const result = await updateSubSection(formData, token);

                if(result){
                    dispatch(setCourse(result)); 
                }

                setLoading(false);
                // by setting modal data null after api call will make subsection modal automatically close 
                setModalData(null);
            }
            else{
                toast.error("No changes made to the form");
            }
            return;
        } 

        // if edit is not true so obiously we are creating new subsection add
        if( add ){
            const formData = new FormData();
            formData.append("courseId", course._id);
            formData.append("sectionId", modalData);
            formData.append("title", data.lectureTitle);
            formData.append("description", data.lectureDesc);
            formData.append("video",data.lectureVideo);

            setLoading(true);

            // Api call
            const result = await createSubSection(formData, token);

            if( result ){
                dispatch(setCourse(result));
            }

            // by setting modal data null after api call will make subsection modal automatically close
            setModalData(null);
            setLoading(false);
        }

    }

  return (
    <div className=' fixed inset-0  z-[1000] h-screen w-screen overflow-auto bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center' >
        <div className=' mt-72 mb-10 2xl:my-10 w-11/12 max-w-[700px] border border-richblack-400 rounded-lg' >
            {/* heading and cross button */}
            <div className='flex justify-between items-center bg-richblack-700 py-4 px-6 rounded-t-lg ' >
                <p className='font-semibold text-lg text-richblack-5' >{add ? ("Adding Lecture") : (view ? ("Viewing Lecture") : edit ? ("Editing Lecture") : ("") )}</p>
                <button
                    type='button'
                    onClick={ () => (!loading && (setModalData(null))) }
                >
                    <RxCross2 size={"24px"} className='text-richblack-5' />
                </button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className='bg-richblack-800 p-8 rounded-b-lg flex flex-col gap-8 ' >
            
                {/* video field */}
                <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? (modalData?.videoUrl) : (null)}
                    editData = {edit ? (modalData?.videoUrl): (null)}
                />

                {/* title field */}
                <div>
                    <label className='flex flex-col gap-1' >
                        <p className='text-sm text-richblack-5' >Lecture Title <sup className='text-pink-400' > *</sup> </p>
                        <input
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {required:true})}
                            className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '  
                        />

                        {/* error */}
                        {
                            errors.lectureTitle && (
                                <p className='text-pink-200 text-xs mt-1 pl-2 ' >Lecture Title is required</p>
                            )
                        }
                    </label>
                </div>

                {/* description field */}
                <div>
                    <label className='flex flex-col gap-1' >
                        <p className='text-sm text-richblack-5' >Lecture Description <sup className='text-pink-400' > *</sup> </p>
                        <textarea
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", {required:true})}
                            className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none min-h-[130px]'

                        />
                    </label>

                    {/* error */}
                    {
                        errors.lectureDesc && (
                            <p className='text-pink-200 text-xs mt-1 pl-2 ' >Lecture Description is required</p>
                        )
                    }
                </div>

                {
                    !view && (
                        <div className='flex flex-row-reverse' >
                            <IconBtn>
                                {edit ? ("Save Changes") : ( loading ? "Loading...": "Save ")}
                            </IconBtn>
                        </div>
                    )
                }

            </form>
        </div>
    </div>
  )
}

export default SubSectionModal;