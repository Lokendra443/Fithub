package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.config.user.CustomUserDetails;
import com.lenncoder.fithub.dto.CommentDto;
import com.lenncoder.fithub.entity.Comment;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.CommentMapper;
import com.lenncoder.fithub.repository.CommentRepo;
import com.lenncoder.fithub.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepo commentRepo;
    private final CommentMapper commentMapper;


    @Override
    public CommentDto addComment(CommentDto commentDto) {
        Comment comment = commentMapper.toEntity(commentDto);

        // Get the currently authenticated user from the SecurityContext
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Get the userId from CustomUserDetails
        Long userId = customUserDetails.getId();

        // Set the userId on the workout object
        comment.setUserId(userId);
        comment.setPostId(commentDto.getPostId());

        Comment savedComment = commentRepo.save(comment);
        return commentMapper.toDto(savedComment);
    }

    @Override
    public List<CommentDto> getCommentsByPostId(Long postId) {
        return commentRepo.findByPostId(postId)
                .stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getCommentsByUserId(Long userId) {
        return commentRepo.findByUserId(userId)
                .stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(Long id) {
        Comment deletedComment = commentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        commentRepo.delete(deletedComment);

    }
}
