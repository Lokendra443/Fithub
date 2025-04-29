
import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { getAllPosts } from "../../../api/post.api";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";


const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get userId from localStorage to pass to components
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('name');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Container className="py-8">
      <Typography variant="h4" className="mb-6 text-center font-bold">
        Community Hub
      </Typography>
      <CreatePost onPostCreated={handlePostCreated} />
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : posts.length === 0 ? (
        <Typography className="text-center">No posts available</Typography>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handlePostDeleted}
              userId={userId}
              userName={userName}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default CommunityPage;