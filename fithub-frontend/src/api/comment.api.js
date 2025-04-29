import { api, getHeader } from ".";

/* add comment */
export async function addComment(commentData) {
  try {
    const response = await api.post("/api/comment/add", commentData, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Add comment error: ${error.message}`
    );
  }
}

/* get comments by post Id */
export async function getCommentsByPostId(postId) {
  try {
    const response = await api.get(`/api/comment/post/${postId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Get comments by post ID error: ${error.message}`
    );
  }
}

/* get comments by user Id */
export async function getCommentsByUserId(userId) {
  try {
    const response = await api.get(`/api/comment/user/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Get comments by user ID error: ${error.message}`
    );
  }
}

/* delete comment */
export async function deleteComment(id) {
  try {
    await api.delete(`/api/comment/delete/${id}`, {
      headers: getHeader(),
    });
    return "Comment deleted successfully";
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Delete comment error: ${error.message}`
    );
  }
}
