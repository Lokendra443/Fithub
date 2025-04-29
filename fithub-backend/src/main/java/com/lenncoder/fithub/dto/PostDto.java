package com.lenncoder.fithub.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

    private Long id;
    private String title;
    private String content;
    private Integer likes;
    private LocalDateTime createdAt;
    private Long userId;
}
