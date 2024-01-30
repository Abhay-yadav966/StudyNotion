import React, { useEffect } from 'react'
import { useState } from 'react';

const RequirementField = ({label, register, errors, name, setValue, getValues}) => {

    // state variable for storing current requirement
    const [requirement, setRequirement] = useState("");

    // state variable for storing requirement list
    const [requirementList, setRequirementList] = useState([]);


    // register for first input
    useEffect( () => {
        register(name, {required:true})
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
        console.log("clicked");
        // copying the requirement list
        const dummyRequirementList = [...requirementList];
        dummyRequirementList.splice(index, 1);
        setRequirementList(dummyRequirementList);
    }

  return (
    <div>
        <label>
            <p>{label}<sup>*</sup></p>
            <input 
                type="text" 
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='text-black'
            />

            {/* add button */}
            <button 
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50' 
            >
                Add
            </button>

            {/* showing list downside */}
            <ul>
                {
                    requirementList.length > 0 && (requirementList.map( (element, index) => (
                        <li key={index} >
                            <p>{element}</p>
                            <button
                                type='button'
                                onClick={ () => handleRemoveRequirement(index)}
                                className=''
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
                    <span>{label} is required</span>
                )
            }
        </label>
    </div>
  )
}

export default RequirementField;