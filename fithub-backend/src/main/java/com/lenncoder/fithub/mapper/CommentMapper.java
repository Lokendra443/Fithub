package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.CommentDto;
import com.lenncoder.fithub.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper extends MapperClass<Comment, CommentDto>{

    CommentDto toDto(Comment e);
    Comment toEntity(CommentDto d);
}
