import React from 'react'
import { MdAssignment, MdChat, MdDashboard, MdPeople } from 'react-icons/md'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { PiUsersThreeFill } from "react-icons/pi";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${isOpen ? 'w-50' : 'w-16'}`}>
      {/* Header */}
      <div className='px-3 py-2 h-12 flex justify-between items-center'>
        <div><h1 className={`${isOpen ? 'block' : 'hidden'} text-2xl font-semibold`}>FitHub</h1></div>
        <div>
          <AiOutlineMenuUnfold 
            size={25} 
            className={`duration-500 cursor-pointer ${!isOpen && 'rotate-180'}`} 
            onClick={toggleSidebar} 
          />
        </div>
      </div>

      {/* Body */}
      <ul className='flex-1 mt-2'>
        <li className='group px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/trainer/dashboard" className="flex items-center gap-2">
            <MdDashboard size={20} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Dashboard</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Dashboard</p>
          </Link>
        </li>
        <li className='group px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/trainer/my-clients" className="flex items-center gap-2">
            <MdPeople size={20} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>My Clients</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>My Clients</p>
          </Link>
        </li>
        <li className='group px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/trainer/assign-workouts" className="flex items-center gap-2">
            <MdAssignment size={22} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Assign Workouts</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Assign Workouts</p>
          </Link>
        </li>
        <li className='group px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/trainer/messages" className="flex items-center gap-2">
            <MdChat size={22} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Messages</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Messages</p>
          </Link>
        </li>
      </ul>

      
    </nav>
  )
}

export default Sidebar
