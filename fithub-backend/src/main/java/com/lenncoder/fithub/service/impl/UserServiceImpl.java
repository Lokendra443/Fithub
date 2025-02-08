package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.dto.UserDto;
import com.lenncoder.fithub.entity.User;
import com.lenncoder.fithub.mapper.UserMapper;
import com.lenncoder.fithub.repository.UserRepo;
import com.lenncoder.fithub.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final UserMapper userMapper;

    @Override
    public UserDto createUser(UserDto userDto) throws Exception {
        // checking if the user with a given email already exists
        if(userRepo.findByEmail(userDto.getEmail()).isPresent()){

            throw new Exception("Email already exists ");
        }

        // Converting DTO to entity, encode the password, and save the user
        User user = userMapper.toEntity(userDto);
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);

        // Converting the saved entity back to DTO and return
        return userMapper.toDto(savedUser);
    }
}
