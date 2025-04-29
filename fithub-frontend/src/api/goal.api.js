import { api, getHeader } from ".";

/* create goal */
export async function createGoal(goalData) {
    try {
      const response = await api.post("/api/goal/create", goalData, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Create goal error: ${error.message}`
      );
    }
  }
  

  /* get all goal */
  export async function getAllGoals(){
    try {
        const response = await api.get("/api/goal/all", {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch goals:", error);
        throw error;
        
    }
  }

/* update goals */
  export async function updateGoal(id, goalData) {
    try {
      const response = await api.put(`/api/goal/update/${id}`, goalData,  {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Update goal error: ${error.message}`
      );
    }
  }


  /* delete goal */
  export async function deleteGoal(id) {
    try {
    await api.delete(`/api/goal/delete/${id}`, {
        headers: getHeader(),
    });
      return "Goal deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete goal error: ${error.message}`
      );
    }
  }


  /* get goals by User Id */
    export async function getGoalsByUserId(userId) {
      try {
        const response = await api.get(`/api/goal/user/${userId}`, {
          headers: getHeader(),
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || `User goals error: ${error.message}`
        );
      }
    }