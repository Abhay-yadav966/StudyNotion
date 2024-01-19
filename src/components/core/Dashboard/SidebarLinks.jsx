import React from 'react'
// importing all icons from react-icon/vsc
import * as Icons from 'react-icons/vsc'
import { Link } from 'react-router-dom';

const SidebarLinks = ({ element, currentClicked, setCurrentClicked }) => {

    // icon
    const Icon = Icons[element.icon];

  return (
    <Link to={element.path}>
      <div onClick={() => setCurrentClicked(element.name)} className={`w-[222px] flex flex-row gap-3 py-2 px-8 items-center ${currentClicked === element.name ? "bg-yellow-800 text-yellow-50 border-l-2 border-yellow-50 " : ""} `} >
          <Icon className={` ${currentClicked === element.name ? "text-yellow-50" : "text-richblack-300"}`} />
          <p className={` font-medium text-base ${currentClicked === element.name ? " text-yellow-50" : "text-richblack-300"}`} >{element.name}</p>
      </div>
    </Link>
  )
}

export default SidebarLinks;