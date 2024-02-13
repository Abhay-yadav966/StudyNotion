import React from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux';
import {createSubSection, updateSubSection} from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import IconBtn from '../../../../common/IconBtn';

// here i have mark value of add, view and edit value by default false.
const subSectionModal = ({ modalData, setModalData, add = false,  view = false, edit = false }) => {

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
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])

    const formUpdated = () => {
        const currentValues = getValues();

        if( currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.lectureVideo ){
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

                formData.append("subSectionId", modalData._id);

                if( currentValues.lectureTitle !== modalData.title  ){
                    formData.append("title", data.lectureTitle);
                }

                if( currentValues.lectureDesc !== modalData.description ){
                    formData.append("description", data.lectureDesc);
                }

                if( currentValues.lectureVideo !== modalData.videoUrl ){
                    formData.append("videoUrl", data.lectureVideo);
                }

                setLoading(true);

                // api call
                const result = await updateSubSection(formData, token);

                if(result){
                    dispatch(setCourse(result)); 
                }
            }
            else{
                toast.error("No changes made to the form");
            }
            return;
        } 

        // if edit is not true so obiously we are creating new subsection add
        if( add ){
            const formData = new FormData();
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

            setModalData(null);
            setLoading(false);
        }

    }

  return (
    <div>
        <div>
            {/* heading and cross button */}
            <div>
                <p>{add ? ("Adding Lecture") : (view ? ("Viewing Lecture") : edit ? ("Editing Lecture") : ("") )}</p>
                <button
                    type='button'
                    onClick={ () => (!loading && setModalData(null)) }
                >
                    <RxCross2 />
                </button>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* video field */}
                <Upload
                    name="lectureVideo"
                    lable="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData = {edit ? modalData.videoUrl: null}
                />

                {/* title field */}
                <div>
                    <label>
                        <p>Lecture Title</p>
                        <input
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {required:true})}
                            className=''  
                        />

                        {/* error */}
                        {
                            errors.lectureTitle && (
                                <p>Lecture Title is required</p>
                            )
                        }
                    </label>
                </div>

                {/* description field */}
                <div>
                    <label>
                        <p>Lecture Description</p>
                        <textarea
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc", {required:true})}
                            className=''

                        />
                    </label>

                    {/* error */}
                    {
                        errors.lectureDesc && (
                            <p>Lecture Description is required</p>
                        )
                    }
                </div>

                {
                    !view && (
                        <div>
                            <IconBtn
                                text={edit ? "Save Changes" : "Save "}
                            />
                        </div>
                    )
                }

            </form>
        </div>
    </div>
  )
}

export default subSectionModal;