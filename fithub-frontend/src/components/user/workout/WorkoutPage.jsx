import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AddWorkout from './AddWorkout';
import EditWorkout from './EditWorkout';
import { format } from 'date-fns';
import DeleteWorkout from './DeleteWorkout';
import { deleteWorkout, getWorkoutsByUserId } from '../../../api/workout.api';






const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete confirmation modal
  

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userId = localStorage.getItem('userId');
  console.log('User ID from localStorage:', userId);


  useEffect(() => {
    // Fetch workouts for the logged-in user
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
    
      const data = await getWorkoutsByUserId(userId);
      console.log("Fetched workouts:", data);
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setOpenDeleteModal(true); // Open the delete confirmation modal
    setSelectedWorkout(id); // Set the selected workout for deletion
  };


  const confirmDelete = async () => {
    if (selectedWorkout) {
      try {
        await deleteWorkout(selectedWorkout);
        setWorkouts((prev) => prev.filter((w) => w.id !== selectedWorkout));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  

 

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedWorkouts = filteredWorkouts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  // Edit button click handler
const handleEditClick = (workout) => {
  setSelectedWorkout(workout);
  setOpenModal(true); // Open modal when clicking Edit
};


const openAddModal = () =>{
  setSelectedWorkout(null);
  setOpenModal(true);
}




  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Workout List
      </Typography>

      <Card
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 1,
          boxShadow: 2,
          backgroundColor: '#f9fafb',
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search Workout"
              variant="outlined"
              fullWidth
              size="small"
              value={search}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              size="small"
              startIcon={<Add />}
              onClick={openAddModal}
              sx={{
                mt: { xs: 1.5, sm: 0 },
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Add Workout
            </Button>
          </Grid>
        </Grid>
      </Card>


      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 550 }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Intensity</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Calories</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 550 }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkouts.map((workout) => {
                const createdAtArray = workout.createdAt; // This is array [year, month, day, hours, minutes, seconds, microseconds]
                const date = new Date(
                  createdAtArray[0], // Year
                  createdAtArray[1] - 1, // Month (JS months are 0-indexed, so subtract 1 from the month)
                  createdAtArray[2], // Day
                  createdAtArray[3], // Hours
                  createdAtArray[4], // Minutes
                  createdAtArray[5], // Seconds
                  createdAtArray[6] / 1000 // Convert microseconds to milliseconds
                );
                
                
                // Format the date in Kathmandu time zone
                const formattedDate = format(date, 'yyyy-MM-dd HH:mm');

                console.log('Original UTC Date:', createdAtArray);
                
                console.log("Formatted Date:", formattedDate);
                

                return (
                  <TableRow hover key={workout.id}>
                    <TableCell>{workout.id}</TableCell>
                    <TableCell>{workout.title}</TableCell>
                    <TableCell>{workout.description}</TableCell>
                    <TableCell>{workout.workoutType}</TableCell>
                    <TableCell>{workout.intensity}</TableCell>
                    <TableCell>{workout.duration}</TableCell>
                    <TableCell>{workout.caloriesBurned}</TableCell>
                    <TableCell>{formattedDate}</TableCell>

                    <TableCell align="center">
                      <Button size="small" color="primary" onClick={() => handleEditClick(workout)}>
                        <Edit fontSize="small" />
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDelete(workout.id)}>
                        <Delete fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredWorkouts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No workouts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredWorkouts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Modal */}
      <DeleteWorkout
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />


      
      {/* Edit and Add Modals */}     
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {selectedWorkout ? (
            <EditWorkout
              workout={selectedWorkout}
              onClose={() => {
                setOpenModal(false);
                fetchWorkouts();  // Refresh data after update
              }}
              
            />
          ) : (
            <AddWorkout onClose={() => {
              setOpenModal(false);
              fetchWorkouts();  // Refresh data after adding new workout
            }} />
          )}
        </Box>
      </Modal>


    </Box>
  );
};

export default WorkoutPage;
