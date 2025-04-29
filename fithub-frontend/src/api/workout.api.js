import { api, getHeader } from ".";

/* create workout */
export async function createWorkout(workoutData) {
    try {
      const response = await api.post("/api/workout/create", workoutData, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Create workout error: ${error.message}`
      );
    }
  }
  

  /* get all workout */
  export async function getAllWorkouts(){
    try {
        const response = await api.get("/api/workout/all", {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch workouts:", error);
        throw error;
        
    }
  }

/* update workout */
  export async function updateWorkout(id, workoutData) {
    try {
      const response = await api.put(`/api/workout/update/${id}`, workoutData,  {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Update workout error: ${error.message}`
      );
    }
  }


  /* delete workout */
  export async function deleteWorkout(id) {
    try {
    await api.delete(`/api/workout/delete/${id}`, {
        headers: getHeader(),
    });
      return "Workout deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete workout error: ${error.message}`
      );
    }
  }

  

  
  /* get workouts by User Id */
  export async function getWorkoutsByUserId(userId) {
    try {
      const response = await api.get(`/api/workout/user/${userId}`, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `User workouts error: ${error.message}`
      );
    }
  }