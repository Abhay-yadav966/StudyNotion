import React from 'react'
import {useState, useEffect} from 'react'
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';


const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

    // fetching value
    const {course, editCourse} = useSelector((state) => state.course);

    // creating state variable for storing
    const [tag, setTag] = useState("");

    // storing variable in array
    const [ tagList, setTagList ] = useState([]);
    

    // on first render
    useEffect(() => {
        if( editCourse ){
            setValue(name, course?.tag);
            setTagList(JSON.parse(course?.tag));
        }

        register(name, {required:true, validate: (value) => value.length > 0})
    }, [])

    // when taglist will change
    useEffect( () => {
        setValue(name, tagList);
    }, [tagList] );

    // keyDownFn. Add tag
    const handleKeyDown = (event) => {
        if( event.key === 'Enter' || event.key === ',' ){
            
            event.preventDefault();
    
            //inserting tag into taglist
            if( tag && !tagList.includes(tag) ){
                setTagList([...tagList, tag]);
                setTag("");
            }
        }
    }

    // Delete Tag
    const handleDeleteTag = (index) => {
        const dummyTagList = [...tagList];
        dummyTagList.splice(index, 1);
        setTagList(dummyTagList);
    }

  return (
    <div>

        <label className='flex flex-col gap-1' >
            {/* lable */}
            <p className='text-base text-richblack-5' >{label}<sup className='text-pink-400' > *</sup></p>

            {/* chip data */}
            <div className='flex flex-wrap' >
                {
                    tagList.map((element, index) => (
                        <div key={index} className='m-1 w-fit flex items-center gap-2 rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5  ' >
                            <p>{element}</p>
                            <button
                                type='button'
                                className=''
                                onClick={() => handleDeleteTag(index)}
                            >
                                <MdClose />
                            </button>
                        </div>
                    ))
                }
            </div>

            {/* input */}
            <input 
                type="text"
                value={tag}
                placeholder={placeholder}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
                className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none '

            />

            {/* if error occur */}
            {
                errors[name] && (<div>
                    <span className='text-pink-200 text-xs mt-1 pl-2 ' >Tags is required</span>
                </div>
                )
            }
        </label>
    </div>
  )
}

export default ChipInput;