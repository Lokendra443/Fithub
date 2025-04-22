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
public class MealPlanDto {

    private Long id;
    private String name;
    private String description;
    private Integer calories;
    private Float protein;
    private Float carbs;
    private Float fat;
    private LocalDateTime createdAt;
    private Long userId;
}
