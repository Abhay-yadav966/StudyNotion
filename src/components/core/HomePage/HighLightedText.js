import React from 'react'

const HighLightedText = ({text}) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-b  from-[#20BDFF] to-[#A5FECB] font-bold ' >
        {" "}
        {text}
    </span>
  )
}

export default HighLightedText;