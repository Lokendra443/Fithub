import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 200, // Increased height for better spacing
};

const buttonStyle = {
  width: '45%', // Each button takes up about half the width of the box
  margin: '10px',
};

const DeleteGoal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
          Are you sure you want to delete this goal?
        </Typography>
        <Box display="flex" justifyContent="center" width="100%">
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            sx={buttonStyle}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(); // Trigger the delete action
              onClose(); // Close the modal after confirming
            }}
            color="error"
            variant="contained"
            sx={buttonStyle}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteGoal;
