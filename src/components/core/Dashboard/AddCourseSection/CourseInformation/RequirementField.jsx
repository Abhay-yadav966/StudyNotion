import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RequirementField = ({label, register, errors, name, setValue, getValues}) => {

    // fetching data
    const { editCourse, course } = useSelector((state) => state.course );

    // state variable for storing current requirement
    const [requirement, setRequirement] = useState("");

    // state variable for storing requirement list
    const [requirementList, setRequirementList] = useState([]);

    // register for first input
    useEffect( () => {
        register(name, {required:true});

        if(editCourse){
            setValue(name, course?.instructions);
            setRequirementList(JSON.parse(course?.instructions));
        }
 
    }, [] );

    // updating on the change of requirement list
    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList]);

    // fn for add requirement
    const handleAddRequirement = () => {

        // checking data is present or not
        if( requirement ){
            // adding data to array
            setRequirementList( (prevData) => ([...prevData, requirement]) );

            // clearing that variable after added to list
            // setRequirement("");
        }
    }

    // fn for remove requirement
    const handleRemoveRequirement = (index) => {
        // copying the requirement list
        const dummyRequirementList = [...requirementList];
        dummyRequirementList.splice(index, 1);
        setRequirementList(dummyRequirementList);
    }

  return (
    <div>
        <label className=' flex flex-col items-start gap-1' >
            <p className='text-base text-richblack-5' >{label}<sup className='text-pink-400' > *</sup></p>
            <input 
                type="text" 
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='rounded-lg p-3 bg-richblack-700 inputShadow font-medium text-base text-richblack-5 outline-none w-full'
            />

            {/* add button */}
            <button 
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50 mt-2 ' 
            >
                Add
            </button>

            {/* showing list downside */}
            <ul>
                {
                    requirementList.length > 0 && (requirementList.map( (element, index) => (
                        <li key={index} className='flex gap-2 items-center ' >
                            <p className='text-richblack-5' >{element}</p>
                            <button
                                type='button'
                                onClick={ () => handleRemoveRequirement(index)}
                                className='text-xs text-richblack-300 '
                            >
                                clear
                            </button>
                        </li>
                    ) ))
                }
            </ul>

            {/* errors */}
            {
                errors[name] && (
                    <span className='text-pink-200 text-xs mt-1 pl-2 ' >{label} is required</span>
                )
            }
        </label>
    </div>
  )
}

export default RequirementField;