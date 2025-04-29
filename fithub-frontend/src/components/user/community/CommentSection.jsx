
import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { addComment, deleteComment, getCommentsByPostId } from "../../../api/comment.api";


const CommentSection = ({ postId, userId, userName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const data = await getCommentsByPostId(postId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment({ postId, content: newComment });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId);
        fetchComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-b-lg">
      <Typography variant="h6" className="mb-2">
        Comments
      </Typography>
      <div className="flex gap-2 mb-4">
        <TextField
          fullWidth
          variant="outlined"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Post
        </Button>
      </div>
      <List>
        {comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" className="text-center py-2">
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          comments.map((comment) => (
            <ListItem key={comment.id} className="flex items-start gap-2">
              <ListItemAvatar>
                <Avatar>{comment.user?.name?.[0] || "U"}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment.user?.name || "Unknown User"}
                secondary={
                  <div className="flex justify-between">
                    <span>{comment.content}</span>
                    {comment.user?.id === userId && (
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default CommentSection;
