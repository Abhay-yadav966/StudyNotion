import React, { useState } from 'react'
import SidebarLinks from './SidebarLinks'
import { sidebarLinks } from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout modal state variable which will decide it will visible or not
  const [ confirmationModal, setConfirmationModal ] = useState(null);

  // fetching user data form slices
  const {user} = useSelector((state) => state.profile);

  // creating state variable to show which is selected
  const [ currentClicked, setCurrentClicked ] = useState(sidebarLinks[0].name);

  return (
    <div className='h-full max-w-[222px] flex flex-col gap-3 border-r border-richblack-700 bg-richblack-800 py-10' >
          {/* upper */}
          <div className='flex flex-col ' >
            {
              sidebarLinks.map((element) => {
                if(element.type && user?.accountType === element.type){
                  return(
                    <SidebarLinks
                      key={element.id}
                      element={element}
                      currentClicked = {currentClicked}
                      setCurrentClicked = {setCurrentClicked}
                    />
                  )
                }

                {/* this sidebar for rendring my profile which does not have specific type and has to render for every user */}
                <SidebarLinks
                  key={element.id}
                  element={element}
                  currentClicked={currentClicked}
                  setCurrentClicked={setCurrentClicked}
                />
              })
            }
          </div>

          {/* middle line */}
          <div className=' w-[33%] mx-auto border-t border-richblack-800 ' ></div>

          {/* lower part */}
          <div>
            <SidebarLinks
              element={{name:"Settings", path:"/dashboard/settings", icon:"VscSettingsGear"}}
              currentClicked={currentClicked}
              setCurrentClicked={setCurrentClicked}
            />

            {/* logout modal */}
            <button onClick={ () => setConfirmationModal({
              heading:"Are you sure?",
              subHeading:"You will be logged out of your account.",
              btn1Text:"Logout",
              btn2Text:"Cancel",
              btn1Handler:() => dispatch(logout(navigate)),
              btn2Handler:() => setConfirmationModal(null),
            })} >
              <VscSignOut />
              <p>Logout</p>
            </button>
          </div>

          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar;