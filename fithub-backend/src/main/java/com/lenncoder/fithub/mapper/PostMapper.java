package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.PostDto;
import com.lenncoder.fithub.entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PostMapper extends MapperClass<Post, PostDto>{

    PostDto toDto(Post e);
    Post toEntity(PostDto d);
}
