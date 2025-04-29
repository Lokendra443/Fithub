import React, { useState } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const TrainerDashboard = () => {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar/>
        
        <div className="p-4 overflow-y-auto bg-gray-100"> 
          <Outlet />
        
        </div>
      </div>
    </div>
  )
}

export default TrainerDashboard
