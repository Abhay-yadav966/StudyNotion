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
     >
        {
            children ? (<>
                {children}
                {text}
            </>) : ({text})
        }
    </button>
  )
}

export default IconBtn;