import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, InputBase, Badge } from '@mui/material';
import { Search, Notifications, Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex justify-between items-center p-4 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
      
      {/* Left Section: Logo & Welcome */}
      <div className="flex items-center gap-3">
        <Link to="/" className="font-semibold text-xl">FitHub</Link>
        <span className="font-medium">Welcome, Lokendra</span>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex items-center border p-2 rounded-full w-1/3 bg-gray-200 hover:bg-gray-300 transition-all">
        <Search className="text-gray-500" />
        <InputBase
          placeholder="Search..."
          className="ml-2 w-full bg-transparent outline-none"
        />
      </div>

      {/* Right Section: Notifications, Dark Mode Toggle, Profile */}
      <div className="flex items-center gap-4">
        
        {/* Dark Mode Toggle */}
        <IconButton onClick={toggleTheme} className="text-gray-700">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Notifications Icon */}
        <IconButton>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* User Avatar */}
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt="User Profile" src="/avatar.png" />
        </IconButton>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle className="mr-2" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/settings" className="flex items-center">
              <AccountCircle className="mr-2" />
              Settings
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
