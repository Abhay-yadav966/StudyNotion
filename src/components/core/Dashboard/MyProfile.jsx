import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {

    // fetching the user data from slice
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div>
        {/* heading */}
        <h1>My Profile</h1>

        <div>
            <div>
                {/* left */}
                <div>
                    <img src={user?.image} alt={`Profile-${user?.firstName}`}  className='' />
                    <div>
                        <p>{user?.firstName + " " + user?.lastName}</p>
                        <p>{user?.email}</p>
                    </div>
                </div>

                {/* right */}
                <IconBtn>
                    
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default MyProfile;