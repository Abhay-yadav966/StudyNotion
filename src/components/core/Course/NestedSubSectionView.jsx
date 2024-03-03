import React from 'react'
import { IoVideocamOutline } from "react-icons/io5";

const NestedSubSectionView = ({data}) => {
  return (
    <div className='flex items-center gap-2 py-6 px-8 ' >
        <IoVideocamOutline size={"20px"} className='text-[#F1F2FF]' />
        <p className='font-medium text-base text-[#F1F2FF]' >{data?.title}</p>
    </div>
  )
}

export default NestedSubSectionView;