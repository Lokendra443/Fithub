// components/Logout.jsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Logout = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    onClose(); // close modal
    navigate('/'); // redirect to home
    
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>
          Do you want to logout?
        </Typography>
        <Box display="flex" justifyContent="center" mt={3} gap={2}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Logout;
