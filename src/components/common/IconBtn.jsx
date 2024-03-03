import React, { Children } from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type
}) => {
  return (
    <button onClick={onclick}
        disabled={disabled}
        type={type}
        className={` flex flex-row gap-3 items-center text-[16px] px-5 py-2 rounded-lg font-semibold  ${outline ? 'text-yellow-50 bg-transparent border border-yellow-50 ' : '  text-black bg-yellow-50 '} `} 
        
     >
        {
            children ? (<>
                {children}
            </>) : 
            ({text})
        }
    </button>
  )
}

export default IconBtn;