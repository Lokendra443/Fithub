import { api, getHeader } from ".";

/* create Post */
export async function createPost(postData) {
  try {
    const response = await api.post("/api/post/create", postData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Create post error: ${error.message}`
    );
  }
}

/* get all Posts */
export async function getAllPosts() {
  try {
    const response = await api.get("/api/post/all", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}

/* get  post by Id */
export async function getPostById(id) {
  try {
    const response = await api.get(`/api/post/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Get post error: ${error.message}`
    );
  }
}

/* get posts by User Id */
export async function getPostsByUserId(userId) {
  try {
    const response = await api.get(`/api/post/user/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `User posts error: ${error.message}`
    );
  }
}

/* delete Post */
export async function deletePost(id) {
  try {
    await api.delete(`/api/post/delete/${id}`, {
      headers: getHeader(),
    });
    return "Post deleted successfully";
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Delete post error: ${error.message}`
    );
  }
}
