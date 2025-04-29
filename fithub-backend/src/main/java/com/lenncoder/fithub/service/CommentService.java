package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.CommentDto;

import java.util.List;

public interface CommentService {

    CommentDto addComment(CommentDto commentDto);
    List<CommentDto> getCommentsByPostId(Long postId);
    List<CommentDto> getCommentsByUserId(Long userId);
    void deleteComment(Long id);
}
