import React, { useState } from 'react'
import SidebarLinks from './SidebarLinks'
import { sidebarLinks } from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout modal state variable which will decide it will visible or not
  const [ confirmationModal, setConfirmationModal ] = useState(null);

  // fetching user data form slices
  const {user} = useSelector((state) => state.profile);

  return (
    <div className='h-full max-w-[222px] flex flex-col gap-5 border-r border-richblack-700 bg-richblack-800 py-10' >
          {/* upper */}
          <div className='flex flex-col ' >
            {
              sidebarLinks.map((element) => {
                if(element.type && user?.accountType !== element.type) return null;
                  
                  return(
                    <SidebarLinks
                      key={element.id}
                      element={element}
                    />
                  )
              })
            }
          </div>

          {/* middle line */}
          <div className=' w-[83%] mx-auto border-t border-richblack-600 ' ></div>

          {/* lower part */}
          <div>
            <SidebarLinks
              element={{name:"Settings", path:"/dashboard/settings", icon:"VscSettingsGear"}}
            />

            {/* logout modal */}
            <button onClick={ () => setConfirmationModal({
              heading:"Are you sure?",
              subHeading:"You will be logged out of your account.",
              btn1Text:"Logout",
              btn2Text:"Cancel",
              btn1Handler:() => dispatch(logout(navigate)),
              btn2Handler:() => setConfirmationModal(null),
            })}
            
            className='flex gap-3 py-2 px-8 items-center text-richblack-300 '
            >
              <VscSignOut />
              <p>Logout</p>
            </button>
          </div>
          {console.log("confirmation model data ---> ", confirmationModal)}
          {confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)}
    </div>
  )
}

export default Sidebar;