import axios from "axios"



export const api = axios.create({
    baseURL: "http://localhost:8484"
})

export const getHeader = () =>{
    const token = localStorage.getItem('token')
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
}




/* This function create a new user  */
export async function registerUser(registration){
    try {
        const response = await api.post("/auth/register", registration)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`User registration error : ${error.message}`)
        }
        
    }
}



/* This function is used for login  */
export async function loginUser(login){
    try {
        const response = await api.post("/auth/login", login)
        if(response.status >= 200 && response.status< 300){
            return response.data
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        return null
        
    }
    
}


/* create workout */
export async function createWorkout(workoutData) {
    try {
      const response = await api.post("/workout/create", workoutData, {
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
        const response = await api.get("/workout/all", {
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
      const response = await api.put(`/workout/update/${id}`, workoutData,  {
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
    await api.delete(`/workout/delete/${id}`, {
        headers: getHeader(),
    });
      return "Workout deleted successfully";
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Delete workout error: ${error.message}`
      );
    }
  }
  
  

