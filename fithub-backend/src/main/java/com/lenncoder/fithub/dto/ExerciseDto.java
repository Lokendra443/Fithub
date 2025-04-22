package com.lenncoder.fithub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto {

    private Long id;
    private String name;
    private String description;
    private Integer sets;
    private Integer repetitions;
    private Integer durationInMinutes;
    private String targetMuscle;
    private String equipment;
    private LocalDateTime createdAt;
    private Long workoutId;
}
