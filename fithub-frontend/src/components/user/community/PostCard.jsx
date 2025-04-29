// PostCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { Favorite, Comment, Delete } from "@mui/icons-material";
import { deletePost } from "../../../api/post.api";
import CommentSection from "./CommentSection";


const PostCard = ({ post, onDelete, userId, userName }) => {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
        onDelete(post.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 shadow-lg">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar>{post.user?.name?.[0] || "U"}</Avatar>
          <div>
            <Typography variant="h6">{post.user?.name || "Unknown User"}</Typography>
            <Typography variant="caption" color="text.secondary">
              {post.createdAt && new Date(post.createdAt).toLocaleString()}
            </Typography>
          </div>
        </div>
        <Typography variant="body1" className="mt-2">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between px-4">
        <div>
          <IconButton>
            <Favorite />
          </IconButton>
          <span>{post.likes?.length || 0}</span>
          <IconButton onClick={handleToggleComments}>
            <Comment />
          </IconButton>
          <span>{post.commentCount || 0}</span>
        </div>
        {post.user?.id === userId && (
          <IconButton onClick={handleDeletePost}>
            <Delete color="error" />
          </IconButton>
        )}
      </CardActions>
      {showComments && 
        <CommentSection 
          postId={post.id} 
          userId={userId} 
          userName={userName}
        />
      }
    </Card>
  );
};

export default PostCard;
