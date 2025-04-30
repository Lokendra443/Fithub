import React, { useEffect, useState } from 'react'
import DeleteUser from './DeleteUser';
import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Grid,
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
import { deleteUser, getAllUsers } from '../../../api/user.api';
import { format } from "date-fns";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete confirmation modal
    
  
    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log("Fetched users:", data);
        // Filter only users with role === 'USER'
      const onlyUsers = data.filter(user => user.role === 'USER');
      setUsers(onlyUsers);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      setOpenDeleteModal(true); // Open the delete confirmation modal
      setSelectedUser(id); // Set the selected workout for deletion
    };
  
  
    const confirmDelete = async () => {
      if (selectedUser) {
        try {
          await deleteUser(selectedUser);
          setUsers((prev) => prev.filter((w) => w.id !== selectedUser));
        } catch (error) {
          alert(error.message);
        }
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };
  
    const handleChangePage = (event, newPage) => setPage(newPage);
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const paginatedUsers = filteredUsers.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  
  


  return (
    
    <Box p={3}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            User List
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
                  label="Search user"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={search}
                  onChange={handleSearchChange}
                />
              </Grid>
            </Grid>
          </Card>
    
    
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>email</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Date Of Birth</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Gender</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Height</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Weight</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Fitness Level</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }}>Fitness Goal</TableCell>
                    <TableCell sx={{ fontWeight: 550, fontSize: '1rem' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {format(new Date(user.dateOfBirth), "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.height}</TableCell>
                    <TableCell>{user.weight}</TableCell>
                    <TableCell>{user.fitnessLevel}</TableCell>
                    <TableCell>{user.fitnessGoal}</TableCell>
                    <TableCell align="center">
                      <Button size="small" color="error" onClick={() => handleDelete(user.id)}>
                        <Delete fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No User found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
    
          {/* Delete Confirmation Modal */}
          <DeleteUser
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={confirmDelete}
          />
    
    
        </Box>
  )
}

export default ManageUsers
