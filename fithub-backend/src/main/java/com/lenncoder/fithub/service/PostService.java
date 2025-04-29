package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.PostDto;

import java.util.List;

public interface PostService {

    PostDto createPost(PostDto postDto);
    List<PostDto> getAllPosts();
    PostDto getPostById(Long id);
    List<PostDto> getPostsByUserId(Long userId);
    void deletePost(Long id);
}
