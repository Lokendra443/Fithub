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
import { Add, Delete, Edit } from "@mui/icons-material";
import { deleteMealPlan, getMealPlansByUserId } from "../../../api/meal-plan.api";
import DeleteMealPlan from "./DeleteMealPlan";
import AddMealPlan from "./AddMealPlan";
import EditMealPlan from "./EditMealPlan";
import { format } from "date-fns";

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

const MealPlanPage = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userId = localStorage.getItem('userId');

  const fetchMealPlans = async () => {
    try {
      const data = await getMealPlansByUserId(userId);
      setMealPlans(data);
    } catch (error) {
      console.error("Error fetching meal plans:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    setSelectedMealPlan(id);
    setOpenDeleteModal(true);
  };

  const handleEditClick = (meal) => {
    setSelectedMealPlan(meal);
    setOpenModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMealPlan(selectedMealPlan);
      setMealPlans((prev) =>
        prev.filter((meal) => meal.id !== selectedMealPlan)
      );
      setOpenDeleteModal(false);
    } catch (error) {
      alert("Error deleting meal plan:", error.message);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredMealPlans = mealPlans.filter((meal) =>
    meal.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedMealPlans = filteredMealPlans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const openAddModal = () => {
    setSelectedMealPlan(null);
    setOpenModal(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Meal Plan List
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
              label="Search Meal Plan"
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
              Add Meal Plan
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 550 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Calories</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Protein</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Carbs</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Fat</TableCell>
                <TableCell sx={{ fontWeight: 550 }}>Created Date</TableCell>
                <TableCell sx={{ fontWeight: 550 }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMealPlans.map((meal) => {
                const createdAt = meal.createdAt;

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
                  <TableRow hover key={meal.id}>
                    <TableCell>{meal.id}</TableCell>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{meal.description}</TableCell>
                    <TableCell>{meal.calories}</TableCell>
                    <TableCell>{meal.protein}</TableCell>
                    <TableCell>{meal.carbs}</TableCell>
                    <TableCell>{meal.fat}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleEditClick(meal)}
                      >
                        <Edit fontSize="small" />
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(meal.id)}
                      >
                        <Delete fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredMealPlans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No meal plans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMealPlans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Modal */}
      <DeleteMealPlan
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Add/Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          {selectedMealPlan ? (
            <EditMealPlan
              mealPlan={selectedMealPlan}
              onClose={() => {
                setOpenModal(false);
                fetchMealPlans();
              }}
            />
          ) : (
            <AddMealPlan
              onClose={() => {
                setOpenModal(false);
                fetchMealPlans();
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MealPlanPage;
