package com.lenncoder.fithub.entity;

import com.lenncoder.fithub.enums.FitnessGoal;
import com.lenncoder.fithub.enums.FitnessLevel;
import com.lenncoder.fithub.enums.Gender;
import com.lenncoder.fithub.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private Date dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Double height;
    private Double weight;

    @Enumerated(EnumType.STRING)
    private FitnessLevel fitnessLevel;

    @Enumerated(EnumType.STRING)
    private FitnessGoal fitnessGoal;

    @Enumerated(EnumType.STRING)
    private Role role;


}
