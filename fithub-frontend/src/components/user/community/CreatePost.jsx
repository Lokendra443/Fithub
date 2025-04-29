
import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { createPost } from "../../../api/post.api";



const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await createPost({ content });
      setContent("");
      onPostCreated();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Paper className="p-4 mb-6 w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600"
          sx={{mt:1}}
        >
          Post
        </Button>
      </form>
    </Paper>
  );
};

export default CreatePost;