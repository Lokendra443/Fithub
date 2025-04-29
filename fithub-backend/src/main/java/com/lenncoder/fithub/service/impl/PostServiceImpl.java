package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.config.user.CustomUserDetails;
import com.lenncoder.fithub.dto.PostDto;
import com.lenncoder.fithub.entity.Post;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.PostMapper;
import com.lenncoder.fithub.repository.PostRepo;
import com.lenncoder.fithub.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final PostMapper postMapper;


    @Override
    public PostDto createPost(PostDto postDto) {
        postDto.setLikes(0); // default likes
        Post post = postMapper.toEntity(postDto);

        // Get the currently authenticated user from the SecurityContext
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Get the userId from CustomUserDetails
        Long userId = customUserDetails.getId();

        // Set the userId on the workout object
        post.setUserId(userId);


        Post savedPost = postRepo.save(post);
        return postMapper.toDto(savedPost);
    }



    @Override
    public List<PostDto> getAllPosts() {
        return postRepo.findAll()
                .stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }



    @Override
    public PostDto getPostById(Long id) {
        Post post = postRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with ID: " + id));
        return postMapper.toDto(post);
    }

    @Override
    public List<PostDto> getPostsByUserId(Long userId) {
        return postRepo.findAllByUserId(userId)
                .stream()
                .map(postMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePost(Long id) {

        Post post = postRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with ID: " + id));
        postRepo.delete(post);

    }
}
