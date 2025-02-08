package com.lenncoder.fithub.mapper;

import com.lenncoder.fithub.dto.UserDto;
import com.lenncoder.fithub.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends MapperClass<User, UserDto>{

    UserDto toDto(User e);
    User toEntity(UserDto d);

}
