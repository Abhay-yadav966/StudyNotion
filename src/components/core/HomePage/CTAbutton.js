import React from 'react'
import { Link } from 'react-router-dom';

const CTAbutton = ({children, linkto, active}) => {
  return (
    <Link to={linkto} >
        <button className={` font-inter text-[16px] px-6 py-3 rounded-lg font-bold
         ${active ? "bg-yellow-50 text-black CTAyellowbutton " : "bg-richblack-800 CTAblackbutton " }
          hover:scale-95 transition-all duration-200 `} >
            {children}
        </button>
    </Link>
  )
}

export default CTAbutton;