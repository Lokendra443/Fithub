package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto createUser(UserDto userDto) throws Exception;

    UserDto updateUser(Long id, UserDto userDto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    void deleteUser(Long id);

}
