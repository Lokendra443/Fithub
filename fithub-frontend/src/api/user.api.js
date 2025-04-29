import { api, getHeader } from ".";

/* get all Users */
export async function getAllUsers(){
    try {
        const response = await api.get("/api/user/all", {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
        
    }
  }


  export async function getUserById(id) {
    try {
      const response = await api.get(`/api/user/${id}`, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "Failed to fetch user");
      } else {
        throw new Error("Network error");
      }
    }
  }
  


  /* delete user */
  export async function deleteUser(id) {
    try {
    await api.delete(`/api/user/delete/${id}`, {
        headers: getHeader(),
    });
      return "User deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete User error: ${error.message}`
      );
    }
  }
  