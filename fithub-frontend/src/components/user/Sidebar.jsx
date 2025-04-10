import React from 'react'
import { FaBars, FaBullseye, FaDumbbell, FaUsers } from 'react-icons/fa'
import { MdMenuOpen } from 'react-icons/md'
import { Link } from 'react-router-dom'


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Header */}
      <div className='px-3 py-2 h-20 flex justify-between items-center'>
        <div><h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-semibold`}>FitHub</h1></div>
        <div>
          <MdMenuOpen 
            size={34} 
            className={`duration-500 cursor-pointer ${!isOpen && 'rotate-180'}`} 
            onClick={toggleSidebar} 
          />
        </div>
      </div>

      {/* Body */}
      <ul className='flex-1'>
        <li className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/user/dashboard" className="flex items-center gap-2">
            <FaBullseye size={30} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Dashboard</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Dashboard</p>
          </Link>
        </li>
        <li className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/user/workout" className="flex items-center gap-2">
            <FaDumbbell size={30} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Workouts</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Workouts</p>
          </Link>
        </li>
        <li className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/user/goal" className="flex items-center gap-2">
            <FaBullseye size={30} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Goals</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Goals</p>
          </Link>
        </li>
        <li className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center'>
          <Link to="/user/community" className="flex items-center gap-2">
            <FaUsers size={30} />
            <p className={`${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>Community</p>
            <p className={`${isOpen && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>Community</p>
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <div className='flex items-center gap-2 px-3 py-2'>
        <FaUsers size={30} />
        <div className={`leading-5 ${!isOpen && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
          <p>Saheb</p>
          <span className='text-xs'>saheb@gmail.com</span>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
