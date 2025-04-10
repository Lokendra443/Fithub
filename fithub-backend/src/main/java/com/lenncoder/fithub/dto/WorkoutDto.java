package com.lenncoder.fithub.dto;

import com.lenncoder.fithub.entity.User;
import com.lenncoder.fithub.enums.Intensity;
import com.lenncoder.fithub.enums.WorkoutType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutDto {
    private Long id;
    private String title;
    private String description;
    private WorkoutType workoutType;
    private Intensity intensity;
    private Integer duration;
    private Integer caloriesBurned;
    private User user;

}
