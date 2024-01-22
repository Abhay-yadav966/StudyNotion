import React, { useEffect } from 'react'
import IconBtn from '../../../common/IconBtn';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CancelBtn from '../CancelBtn';
import ChangeProfilePicture from './ChangeProfilePicture';

const Settings = () => {

    const {user} = useSelector((state) => state.profile);

    // react form hook
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    // form submit fn.
    const profileDataSubmit = async (data) => {
        console.log("Profile updated", data);
    }

    // reset form fn.
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                dateOfBirth:"",
                gender:"",
                contactNumber:"",
                about:"",
            });
        }
    }, [isSubmitSuccessful])

  return (
    <div className='flex flex-col gap-10 p-10' >
        {/* heading */}
        <h1 className='font-semibold text-3xl text-richblack-5 pb-5 ' >Edit Profile</h1>

        {/* upload profile */}
        <ChangeProfilePicture/>

        {/* profile information */}
        <form onSubmit={handleSubmit(profileDataSubmit)} >

            <div>
                <h3>Profile Information</h3>
                <div>
                    <div>
                        {/* first name */}
                        <label>
                            <p>First Name</p>
                            <input type="text" 
                                name='firstName'       
                                placeholder='Enter first name'
                                {...register("firstName",{required:true})}
                                defaultValue={user?.firstName}
                            />

                            {/* if error occur */}
                            {
                                errors.firstName && (<div>
                                    Please enter your first name.
                                </div>)
                            }
                        </label>

                        {/* DOB */}
                        <label>
                            <p>Date of Birth</p>
                            <input type="date" 
                                   name="dateOfBirth"
                                   {...register("dateOfBirth",{required:true})}
                                    defaultValue={user?.additionDetails?.dateOfBirth}
                            />

                            {/* if error occur */}
                            {
                                errors.dateOfBirth && (<div>
                                    Please enter your Date of Birth.
                                </div>)
                            }
                        </label>

                        {/* contact no. */}
                        <label>
                            <p>Contact Number</p>
                            <input type="text" 
                                   name="contactNumber"
                                   placeholder='Enter Contact Number'
                                   {...register("contactNumber",{required:true})}
                                    maxLength={10}
                            />

                            {/* if an error occur */}
                            {
                                errors.contactNumber && <div>
                                    Please enter your Contact Number.
                                </div>
                            }
                        </label>

                    </div>

                    <div>
                        {/* last name */}
                        <label>
                            <p>Last Name</p>
                            <input type="text" name="" id="" />
                        </label>

                        {/* gender */}
                        <label>
                            <p>Gender</p>
                            <select name="" id="">
                                <option value="">Male</option>
                                <option value="">Female</option>
                                <option value="">Non-Binary</option>
                                <option value="">Prefer not to say</option>
                                <option value="">Others</option>
                            </select>
                        </label>

                        {/* about */}
                        <label>
                            <p>About</p>
                            <input type="text" name="" id="" />
                        </label>
                    </div>
                </div>
            </div>

            {/* buttons */}
            <div>
                <CancelBtn/>
                <IconBtn type="submit" >
                    Save
                </IconBtn>
            </div>
        </form>
    </div>
  )
}

export default Settings;