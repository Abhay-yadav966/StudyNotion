import React from 'react'

const StatsData = [
    {
        count:"5K",
        label:"Active Students",
    },
    {
        count:"10+",
        label:"Mentors",
    },
    {
        count:"200+",
        label:"Courses",
    },
    {
        count:"50+",
        label:"Awards",
    }
]

const Stats = () => {

  return (
    <div className='flex items-center justify-between ' >
        {
            StatsData.map( (elem, index) => (
                <div key={index}  className=' flex flex-col gap-2 text-center' >
                    <p className='font-bold text-3xl text-richblack-5' >{elem.count}</p>
                    <p className='font-semibold text-base text-richblack-500 ' >{elem.label}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Stats;