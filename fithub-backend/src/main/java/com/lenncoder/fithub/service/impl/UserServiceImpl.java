package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.dto.UserDto;
import com.lenncoder.fithub.entity.User;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.exception.UserAlreadyExistsException;
import com.lenncoder.fithub.mapper.UserMapper;
import com.lenncoder.fithub.repository.UserRepo;
import com.lenncoder.fithub.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final UserMapper userMapper;
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) throws Exception {
        // checking if the user with a given email already exists
        if(userRepo.findByEmail(userDto.getEmail()).isPresent()){

            throw new UserAlreadyExistsException("Email already exists ");
        }

        // Converting DTO to entity, encode the password, and save the user
        User user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);

        // Converting the saved entity back to DTO and return
        return userMapper.toDto(savedUser);
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User updatedUser = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        updatedUser.setName(userDto.getName());
        updatedUser.setEmail(userDto.getEmail());
        return userMapper.toDto(userRepo.save(updatedUser));
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return userMapper.toDto(user);

    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map(userMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        User deletedUser = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        userRepo.delete(deletedUser);


    }
}
