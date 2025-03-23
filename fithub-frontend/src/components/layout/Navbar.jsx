import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <span className="ml-2 text-2xl font-bold">FitHub</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-white transition duration-200"
                >
                  Pricing
                </a>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-white transition duration-200 ${
                      isActive ? 'text-white font-semibold' : ''
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <li>
                <a
                  href="#hero"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-200"
                  onClick={toggleMenu}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-200"
                  onClick={toggleMenu}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-200"
                  onClick={toggleMenu}
                >
                  Pricing
                </a>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-200 ${
                      isActive ? 'text-white bg-gray-700' : ''
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
