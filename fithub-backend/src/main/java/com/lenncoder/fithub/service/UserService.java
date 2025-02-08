package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.UserDto;

public interface UserService {

    UserDto createUser(UserDto userDto) throws Exception;

}
