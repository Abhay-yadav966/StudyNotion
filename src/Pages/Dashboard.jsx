import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar'; 

const Dashboard = () => {
  return (
    <div className='h-screen flex' >

        {/* sidebar */}
        <Sidebar/>

        {/* my profile section*/}
        <div className='w-full overflow-auto ' >
          <div className='mx-auto h-full w-11/12 max-w-[1000px] ' >
              <Outlet/>
          </div>
        </div>

    </div>
  )
}

export default Dashboard;