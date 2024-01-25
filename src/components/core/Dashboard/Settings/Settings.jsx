import React, { useEffect } from 'react'
import IconBtn from '../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import CancelBtn from '../CancelBtn';
import ChangeProfilePicture from './ChangeProfilePicture';
import {updateProfile} from '../../../../services/operations/SettingsAPI'
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    console.log("printing token ", token )

    const dispatch = useDispatch();

    // react form hook
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    // form submit fn.
    const profileDataSubmit = async (data) => {
        try{
            dispatch(updateProfile(token, data));
        }
        catch(error){
            console.log("error in editing profile", error);
        }
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

            <div className='flex flex-col gap-6 rounded-lg border border-richblack-700 bg-richblack-800 p-8 px-12 ' >
                <h3 className='font-semibold text-lg text-richblack-5' >Profile Information</h3>
                <div className='flex flex-col gap-6' >
                    <div className='flex gap-6 justify-between' >
                        {/* first name */}
                        <label className='flex flex-col gap-2 w-[50%] ' >
                            <p className='font-medium text-sm text-richblack-5' >First Name</p>
                            <input type="text" 
                                name='firstName'       
                                placeholder='Enter first name'
                                {...register("firstName",{required:true})}
                                defaultValue={user?.firstName}
                                className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                            />

                            {/* if error occur */}
                            {
                                errors.firstName && (<div className='text-xs text-yellow-100' >
                                    Please enter your first name.
                                </div>)
                            }
                        </label>

                        {/* last name */}
                        <label className='flex flex-col gap-2 w-[50%]' >
                            <p className='font-medium text-sm text-richblack-5' >Last Name</p>
                            <input 
                             type="text"
                             name="lastName"
                             placeholder='Enter Last name'
                             {...register("lastName", {required:true})} 
                             defaultValue={user?.lastName}
                             className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                             />

                             {/* if an error occur */}
                             {
                                errors.lastName && (<div className='text-xs text-yellow-100' >
                                    Please enter your last name.
                                </div>)
                             }
                        </label>
                    </div>

                    <div className='flex gap-6 justify-between ' >
                        {/* DOB */}
                        <label className='flex flex-col gap-2 w-[50%]' >
                            <p className='font-medium text-sm text-richblack-5' >Date of Birth</p>
                            <input type="date" 
                                   name="dateOfBirth"
                                   {...register("dateOfBirth",{required:true})}
                                    defaultValue={user?.additionDetails?.dateOfBirth}
                                    className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                            />

                            {/* if error occur */}
                            {
                                errors.dateOfBirth && (<div className='text-xs text-yellow-100' >
                                    Please enter your Date of Birth.
                                </div>)
                            }
                        </label>

                        {/* gender */}
                        <label className='flex flex-col gap-2 w-[50%]' >
                            <p className='font-medium text-sm text-richblack-5' >Gender</p>
                            <select 
                                name="gender"
                                {...register("gender", {required:true})}
                                defaultValue={user?.additionDetails?.gender}
                                className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                                <option value="Others">Others</option>
                            </select>
                        </label>
                    </div>

                    <div className='flex gap-6 justify-between ' >    
                        {/* contact no. */}
                        <label className='flex flex-col gap-2 w-[50%]' >
                            <p className='font-medium text-sm text-richblack-5' >Contact Number</p>
                            <input type="text" 
                                   name="contactNumber"
                                   placeholder='Enter Contact Number'
                                   {...register("contactNumber",{required:true})}
                                    maxLength={10}
                                    defaultValue={user?.additionDetails?.contactNumber}
                                    className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                            />

                            {/* if an error occur */}
                            {
                                errors.contactNumber && (<div className='text-xs text-yellow-100' >
                                    Please enter your Contact Number.
                                </div>)
                            }
                        </label>

                        {/* about */}
                        <label className='flex flex-col gap-2 w-[50%]' >
                            <p className='font-medium text-sm text-richblack-5' >About</p>
                            <input 
                                type="text" 
                                name="about"  
                                placeholder='Enter Bio Details'
                                {...register("about", {required:true})}
                                defaultValue={user?.additionDetails?.about}
                                className='p-3 rounded-lg bg-richblack-700 CTAblackbutton font-medium text-base text-richblack-5'
                            />

                            {/* if an error occur */}
                            {
                                errors.about && (<div className='text-xs text-yellow-100' >
                                    Please enter your About.
                                </div>)
                            }
                        </label>
                    </div>
                </div>
            </div>

            {/* buttons */}
            <div className='flex flex-row-reverse mt-10 gap-2  ' >
                <IconBtn type="submit" >
                    Save
                </IconBtn>
                <CancelBtn/>
            </div>
        </form>

        {/* change password */}
        <UpdatePassword/>

        {/* delete account */}
        <DeleteAccount/>
    </div>
  )
}

export default Settings;