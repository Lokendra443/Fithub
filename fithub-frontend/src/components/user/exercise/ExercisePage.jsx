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
import { format } from 'date-fns';
import { deleteExercise, getExercisesByUserId } from '../../../api/exercise.api';
import AddExercise from './AddExercise';
import EditExercise from './EditExercise';
import DeleteExercise from './DeleteExercise';



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

const ExercisePage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userId = localStorage.getItem('userId');

  const fetchExercises = async () => {
    try {
      const data = await getExercisesByUserId(userId);
      setExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (exercise) => {
    setSelectedExercise(exercise);
    setOpenModal(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedExercise(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedExercise) {
      try {
        await deleteExercise(selectedExercise);
        setExercises((prev) => prev.filter((e) => e.id !== selectedExercise));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedExercises = filteredExercises.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Exercise List
      </Typography>

      <Card sx={{ p: 2, mb: 2, borderRadius: 1, boxShadow: 2, backgroundColor: '#f9fafb' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search Exercise"
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
              onClick={() => {
                setSelectedExercise(null);
                setOpenModal(true);
              }}
              sx={{
                mt: { xs: 1.5, sm: 0 },
                px: 2,
                py: 1,
                fontSize: '0.8rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Add Exercise
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
                <TableCell sx={{ fontWeight: 550 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Sets</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Repetitions</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>duration In Minutes</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Target Muscle</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Equipment</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Workout Id</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 550 }} align="center">Actions</TableCell> 

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedExercises.map((exercise) => {
                const createdAt = exercise.createdAt;
                const date = new Date(
                  createdAt[0],
                  createdAt[1] - 1,
                  createdAt[2],
                  createdAt[3],
                  createdAt[4],
                  createdAt[5],
                  createdAt[6] / 1000
                );
                const formattedDate = format(date, 'yyyy-MM-dd HH:mm');

                return (
                  <TableRow hover key={exercise.id}>
                    <TableCell>{exercise.id}</TableCell>
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>{exercise.description}</TableCell>
                    <TableCell>{exercise.sets}</TableCell>
                    <TableCell>{exercise.repetitions}</TableCell>
                    <TableCell>{exercise.durationInMinutes}</TableCell>
                    <TableCell>{exercise.targetMuscle}</TableCell>
                    <TableCell>{exercise.equipment}</TableCell>
                    <TableCell>{exercise.workoutId}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell align="center">
                      <Button size="small" color="primary" onClick={() => handleEditClick(exercise)}>
                        <Edit fontSize="small" />
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDeleteClick(exercise.id)}>
                        <Delete fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredExercises.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No exercises found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredExercises.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Modal */}
      <DeleteExercise
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {selectedExercise ? (
            <EditExercise
              exercise={selectedExercise}
              onClose={() => {
                setOpenModal(false);
                fetchExercises();
              }}
            />
          ) : (
            <AddExercise
              onClose={() => {
                setOpenModal(false);
                fetchExercises();
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ExercisePage;
