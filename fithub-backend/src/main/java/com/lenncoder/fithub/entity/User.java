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

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

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

    private String profileImage;

    private Integer experience;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Workout> workouts; // Relationship with workout

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Goal> goals;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MealPlan> mealPlans;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


}
