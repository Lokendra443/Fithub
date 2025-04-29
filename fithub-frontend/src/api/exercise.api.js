import { api, getHeader } from ".";

/* create exercise */
export async function createExercise(exerciseData) {
    try {
      const response = await api.post("/api/exercise/create", exerciseData, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Create exercise error: ${error.message}`
      );
    }
  }
  

  /* get all exercise */
  export async function getAllExercises(){
    try {
        const response = await api.get("/api/exercise/all", {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch exercises:", error);
        throw error;
        
    }
  }

/* update exercise */
  export async function updateExercise(id, exerciseData) {
    try {
      const response = await api.put(`/api/exercise/update/${id}`, exerciseData,  {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Update exercise error: ${error.message}`
      );
    }
  }


  /* delete exercise */
  export async function deleteExercise(id) {
    try {
    await api.delete(`/api/exercise/delete/${id}`, {
        headers: getHeader(),
    });
      return "Exercise deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete exercise error: ${error.message}`
      );
    }
  }


  /* get exercises by User Id */
    export async function getExercisesByUserId(userId) {
      try {
        const response = await api.get(`/api/exercise/user/${userId}`, {
          headers: getHeader(),
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || `User exercise error: ${error.message}`
        );
      }
    }