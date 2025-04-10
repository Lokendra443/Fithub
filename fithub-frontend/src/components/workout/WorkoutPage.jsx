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
import { deleteWorkout, getAllWorkouts } from '../utils/ApiFunctions';
import AddWorkout from './AddWorkout';

const modalStyle = {
  position: 'absolute',
  top: '58%',
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

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchWorkouts = async () => {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(id);
        setWorkouts((prev) => prev.filter((w) => w.id !== id));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

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

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Workout List
      </Typography>

      <Card sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search Workout"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
              sx={{ mt: { xs: 2, sm: 0 } }}
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
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Intensity</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkouts.map((workout) => (
                <TableRow hover key={workout.id}>
                  <TableCell>{workout.id}</TableCell>
                  <TableCell>{workout.title}</TableCell>
                  <TableCell>{workout.description}</TableCell>
                  <TableCell>{workout.workoutType}</TableCell>
                  <TableCell>{workout.intensity}</TableCell>
                  <TableCell>{workout.duration}</TableCell>
                  <TableCell>{workout.caloriesBurned}</TableCell>
                  <TableCell>{workout.createdAt}</TableCell>
                  <TableCell align="center">
                    <Button size="small" color="primary" onClick={() => alert("Edit coming soon")}>
                      <Edit fontSize="small" />
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(workout.id)}>
                      <Delete fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <AddWorkout onClose={() => {
            setOpenModal(false);
            fetchWorkouts();
          }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default WorkoutPage;
