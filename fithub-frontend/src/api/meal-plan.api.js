import { api, getHeader } from ".";

/* create meal plan */
export async function createMealPlan(mealPlanData) {
    try {
      const response = await api.post("/api/meal-plan/create", mealPlanData, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Create meal plan error: ${error.message}`
      );
    }
  }
  

  /* get all meal plans */
  export async function getAllMealPlans(){
    try {
        const response = await api.get("/api/meal-plan/all", {
            headers: getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch meal plans:", error);
        throw error;
        
    }
  }

/* update meal plans */
  export async function updateMealPlan(id, mealPlanData) {
    try {
      const response = await api.put(`/api/meal-plan/update/${id}`, mealPlanData,  {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Update meal plan error: ${error.message}`
      );
    }
  }


  /* delete meal plan */
  export async function deleteMealPlan(id) {
    try {
    await api.delete(`/api/meal-plan/delete/${id}`, {
        headers: getHeader(),
    });
      return "Meal Plan deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete meal plan error: ${error.message}`
      );
    }
  }


  /* get meal plans by User Id */
  export async function getMealPlansByUserId(userId) {
    try {
      const response = await api.get(`/api/meal-plan/user/${userId}`, {
        headers: getHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `User meal plans error: ${error.message}`
      );
    }
  }