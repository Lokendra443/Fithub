import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserById } from '../../api/user.api';
import Logout from './Logout';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get user ID from localStorage
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          throw new Error('User not logged in or ID not found');
        }
        
        const userData = await getUserById(userId);
        setUser(userData);
        
        // Set the profile image if it exists in user data
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // First preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target.result);
    };
    reader.readAsDataURL(file);

    try {
      // Upload the image to the server
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', user.id);

      const response = await axios.post('/api/user/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update the user object with the new profile image URL
      setUser({ ...user, profileImage: response.data.imageUrl });
    } catch (err) {
      console.error('Error uploading image:', err);
      // Show error notification or message here
    } finally {
      setIsUploading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleLogout = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl font-semibold">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-end mb-4">
          <Button 
            variant="outlined" 
            color="error" 
            onClick={toggleLogout}
          >
            Logout
          </Button>
        </div>
        
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="relative mb-6 cursor-pointer" onClick={toggleModal}>
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg">
              <label htmlFor="profile-upload" className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="text-white">Uploading...</div>
              </div>
            )}
          </div>

          {/* User Info */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{user?.name || 'User Name'}</h1>
          <p className="text-gray-600 mb-4">{user?.email || 'user@example.com'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="font-medium">{user?.gender || 'Not specified'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal - Using MUI Modal similar to Logout component */}
      <Modal 
        open={isModalOpen} 
        onClose={toggleModal}
        aria-labelledby="profile-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 600 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography id="profile-modal-title" variant="h6">
              User Profile
            </Typography>
            <Button onClick={toggleModal} size="small">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </Box>
          
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={{ xs: 3, md: 0 }} mr={{ md: 4 }}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-3">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label htmlFor="modal-profile-upload">
                <input
                  id="modal-profile-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <Button 
                  variant="contained" 
                  component="span"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Change Photo'}
                </Button>
              </label>
            </Box>
            
            <Box flex={1}>
              <Box mb={2}>
                <Typography variant="caption" color="textSecondary">Name</Typography>
                <Typography variant="body1">{user?.name || 'User Name'}</Typography>
              </Box>
              
              <Box mb={2}>
                <Typography variant="caption" color="textSecondary">Email</Typography>
                <Typography variant="body1">{user?.email || 'user@example.com'}</Typography>
              </Box>
              
              <Box mb={2}>
                <Typography variant="caption" color="textSecondary">Gender</Typography>
                <Typography variant="body1">{user?.gender || 'Not specified'}</Typography>
              </Box>
              
              <Box mb={2}>
                <Typography variant="caption" color="textSecondary">Role</Typography>
                <Typography variant="body1">{user?.role || 'User'}</Typography>
              </Box>
            </Box>
          </Box>
          
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" onClick={toggleModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      
      {/* Logout Modal */}
      <Logout open={isLogoutOpen} onClose={toggleLogout} />
    </div>
  );
};

export default Profile;