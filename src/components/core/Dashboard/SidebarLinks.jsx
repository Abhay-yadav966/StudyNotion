import React from 'react'
// importing all icons from react-icon/vsc
import * as Icons from 'react-icons/vsc'
import { Link, useLocation } from 'react-router-dom';

const SidebarLinks = ({ element }) => {

    // icon
    const Icon = Icons[element.icon];

    // location
    const location = useLocation();


  return (
    <Link to={element.path}>
      <div className={`w-[222px] flex flex-row gap-3 py-2 px-8 items-center ${location.pathname === element.path ? "bg-yellow-800 border-l-2 border-yellow-50 " : ""} `} >
          <Icon className={` ${location.pathname === element.path ? "text-yellow-50" : "text-richblack-300"}`} />
          <p className={` font-medium text-base ${location.pathname === element.path ? " text-yellow-50" : "text-richblack-300"}`} >{element.name}</p>
      </div>
    </Link>
  )
}

export default SidebarLinks;