import { api } from "."


/* This function create a new user  */
export async function registerUser(registration) {
    try {
        const response = await api.post("/api/auth/register", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data); 
        } else if (error.message === "Network Error") {
            throw new Error("Cannot connect to the server. Please try again later.");
        } else {
            throw new Error(`User registration failed: ${error.message}`);
        }
    }
}




/* This function is used for login  */
export async function loginUser(login){
    try {
        const response = await api.post("/api/auth/login", login)
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