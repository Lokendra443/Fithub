import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { format } from "date-fns";
import { deleteGoal, getGoalsByUserId } from "../../../api/goal.api";
import DeleteGoal from "./DeleteGoal";
import EditGoal from "./EditGoal";
import AddGoal from "./AddGoal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const GoalPage = () => {
  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userId = localStorage.getItem('userId');

  const fetchGoals = async () => {
    try {
      const data = await getGoalsByUserId(userId);
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error.message);
    }
  };

  const handleDelete = (id) => {
    setOpenDeleteModal(true);
    setSelectedGoal(id);
  };

  const confirmDelete = async () => {
    if (selectedGoal) {
      try {
        await deleteGoal(selectedGoal);
        setGoals((prev) => prev.filter((g) => g.id !== selectedGoal));
        setOpenDeleteModal(false);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedGoals = filteredGoals.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (goal) => {
    setSelectedGoal(goal);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchGoals();
  }, []);


  const openAddModal = () =>{
    setSelectedGoal(null);
    setOpenModal(true);
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Goal List
      </Typography>

      <Card
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 1,
          boxShadow: 2,
          backgroundColor: "#f9fafb",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search Goal"
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
                fontSize: "0.8rem",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Add Goal
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 550 }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Target Date</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 550 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedGoals.map((goal) => {
                const createdAt = goal.createdAt;

                const date = new Date(
                  createdAt[0],
                  createdAt[1] - 1,
                  createdAt[2],
                  createdAt[3],
                  createdAt[4],
                  createdAt[5],
                  createdAt[6] / 1000
                );

                const formattedDate = format(date, "yyyy-MM-dd HH:mm");

                return (
                  <TableRow hover key={goal.id}>
                    <TableCell>{goal.id}</TableCell>
                    <TableCell>{goal.title}</TableCell>
                    <TableCell>{goal.description}</TableCell>
                    <TableCell>
                      {format(new Date(goal.targetDate), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>{goal.progress}%</TableCell>
                    <TableCell>{goal.status}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(goal)}
                      >
                        <Edit fontSize="small" />
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredGoals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No goals found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredGoals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Modal */}
      <DeleteGoal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {selectedGoal ? (
            <EditGoal
              goal={selectedGoal}
              onClose={() => {
                setOpenModal(false);
                fetchGoals();
              }}
            />
          ) : (
            <AddGoal
              onClose={() => {
                setOpenModal(false);
                fetchGoals();
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default GoalPage;
