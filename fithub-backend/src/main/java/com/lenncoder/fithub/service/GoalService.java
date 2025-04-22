package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.GoalDto;

import java.util.List;

public interface GoalService {

    GoalDto createGoal(GoalDto goalDto);
    GoalDto updateGoal(Long id, GoalDto goalDto);
    GoalDto getGoalById(Long id);
    List<GoalDto> getGoalByUserId(Long userId);
    List<GoalDto> getAllGoals();
    void deleteGoal(Long id);
}
