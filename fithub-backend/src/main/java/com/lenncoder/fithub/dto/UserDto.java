package com.lenncoder.fithub.dto;

import com.lenncoder.fithub.enums.FitnessGoal;
import com.lenncoder.fithub.enums.FitnessLevel;
import com.lenncoder.fithub.enums.Gender;
import com.lenncoder.fithub.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private Date dateOfBirth;
    private Gender gender;
    private Double height;
    private Double weight;
    private FitnessLevel fitnessLevel;
    private FitnessGoal fitnessGoal;
    private Role role;
    private String profileImage;
    private Integer experience;

}
