import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${
        isOpen ? "w-50" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="px-3 py-2 h-12 flex justify-between items-center">
        <div>
          <h1
            className={`${isOpen ? "block" : "hidden"} text-2xl font-semibold`}
          >
            FitHub
          </h1>
        </div>
        <div>
          <AiOutlineMenuUnfold
            size={25}
            className={`duration-500 cursor-pointer ${!isOpen && "rotate-180"}`}
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Body */}
      <ul className="flex-1 mt-2">

        <li className="group relative px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex items-center gap-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 relative"
          >
            <MdDashboard size={20} />

            {/* Normal Label (in flow, but hides on collapse) */}
            <span
              className={`duration-300 whitespace-nowrap ${
                isOpen ? "ml-2 block" : "hidden"
              }`}
            >
              Dashboard
            </span>

            {/* Tooltip when sidebar is collapsed */}
            {!isOpen && (
              <span className="absolute left-14 z-10 whitespace-nowrap bg-white text-black rounded-md px-2 py-1 shadow-md scale-0 group-hover:scale-100 origin-left duration-200">
                Dashboard
              </span>
            )}
          </Link>
        </li>



        <li className="group relative px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex items-center gap-2">
          <Link
            to="/admin/manage-users"
            className="flex items-center gap-2 relative"
          >
            <FaUsers size={20} />

            <span
              className={`duration-300 whitespace-nowrap ${
                isOpen ? "ml-2 block" : "hidden"
              }`}
            >
              Manage Users
            </span>

            {!isOpen && (
              <span className="absolute left-14 z-10 whitespace-nowrap bg-white text-black rounded-md px-2 py-1 shadow-md scale-0 group-hover:scale-100 origin-left duration-200">
                Manage Users
              </span>
            )}
          </Link>
        </li>

        <li className="group relative px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex items-center gap-2">
          <Link
            to="/admin/manage-trainers"
            className="flex items-center gap-2 relative"
          >
            <FaUsers size={20} />

            {/* Normal Label (in flow, but hides on collapse) */}
            <span
              className={`duration-300 whitespace-nowrap ${
                isOpen ? "ml-2 block" : "hidden"
              }`}
            >
              Manage Trainers
            </span>

            {/* Tooltip when sidebar is collapsed */}
            {!isOpen && (
              <span className="absolute left-14 z-10 whitespace-nowrap bg-white text-black rounded-md px-2 py-1 shadow-md scale-0 group-hover:scale-100 origin-left duration-200">
                Manage Trainers
              </span>
            )}
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Sidebar;
