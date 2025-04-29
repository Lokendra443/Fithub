package com.lenncoder.fithub.controller;

import com.lenncoder.fithub.dto.CommentDto;
import com.lenncoder.fithub.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {


    private final CommentService commentService;

    @PostMapping("/add")
    public ResponseEntity<CommentDto> addComment(CommentDto commentDto) {
        CommentDto addedComment = commentService.addComment(commentDto);
        return new ResponseEntity<>(addedComment, HttpStatus.CREATED);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDto>> getCommentByPostId(@PathVariable Long postId) {
        List<CommentDto> commentsByPostId = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(commentsByPostId, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommentDto>> getCommentsByUserId(@PathVariable Long userId) {
        List<CommentDto> commentsByUserId = commentService.getCommentsByUserId(userId);
        return new ResponseEntity<>(commentsByUserId, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    


}
