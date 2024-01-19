import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar'; 

const Dashboard = () => {
  return (
    <div className='h-screen flex ' >

        {/* sidebar */}
        <Sidebar/>

        {/* my profile section*/}
        <div className='w-full' >
          <div className='mx-auto w-11/12 max-w-[1000px] py-10' >
              <Outlet/>
          </div>
        </div>

    </div>
  )
}

export default Dashboard;