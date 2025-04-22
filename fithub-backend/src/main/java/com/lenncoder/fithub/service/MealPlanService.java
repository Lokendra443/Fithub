package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.MealPlanDto;

import java.util.List;

public interface MealPlanService {

    MealPlanDto createMealPlan(MealPlanDto mealPlanDto);
    MealPlanDto updateMealPlan(Long id, MealPlanDto mealPlanDto);
    MealPlanDto getMealPlanById(Long id);
    List<MealPlanDto> getMealPlanByUserId(Long userId);
    List<MealPlanDto> getAllMealPlan();
    void deleteMealPlan(Long id);
}
