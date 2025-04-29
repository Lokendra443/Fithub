import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  InputBase,
  Badge,
} from '@mui/material';
import {
  Search,
  Notifications,
  AccountCircle,
  LogoutRounded,
} from '@mui/icons-material';
import Logout from '../auth/Logout';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [userName, setUserName] = useState("");  // Store user name
  
    useEffect(() => {
      // Get user info from localStorage
      const user = localStorage.getItem('name'); 
      if (user) {
        setUserName(user); // Set the user's name
      }
    }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 shadow-sm bg-white">

      {/* Left: Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Trainer Dashboard</h1>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-grow flex justify-center">
        <div className="flex items-center border border-gray-200 px-2 py-0.5 rounded-2xl w-60 bg-gray-100 hover:bg-gray-200 transition-all duration-200">
          <Search fontSize="small" className="text-gray-500" />
          <InputBase
            placeholder="Search..."
            className="ml-2 w-full text-sm"
          />
        </div>
      </div>

      {/* Right: Notification → Avatar → Name */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <IconButton size="small">
          <Badge badgeContent={1} color="error">
            <Notifications fontSize="small" />
          </Badge>
        </IconButton>

        {/* Avatar */}
        <IconButton size="small" onClick={handleMenuOpen}>
          <Avatar
            alt="User Profile"
            src="/avatar.png"
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>

        {/* Name (not clickable) */}
        <span className="text-lg font-medium text-gray-700">{userName || "Trainer"}</span>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountCircle fontSize="small" className="mr-2" />
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setLogoutOpen(true);
            }}
          >
            <LogoutRounded fontSize="small" className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* Logout Modal */}
      <Logout open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
};

export default Navbar;
