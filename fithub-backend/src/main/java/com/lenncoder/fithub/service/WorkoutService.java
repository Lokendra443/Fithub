package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.WorkoutDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutService {

    WorkoutDto createWorkout(WorkoutDto workoutDto);
    WorkoutDto updateWorkout(Long id, WorkoutDto workoutDto);
    void deleteWorkout(Long id);
    WorkoutDto getWorkoutById(Long id);
    List<WorkoutDto> getAllWorkouts();
    List<WorkoutDto> getAllWorkoutsByUser(Long userId);
    Page<WorkoutDto> getWorkoutsByFilters(Long userId, LocalDate startDate, LocalDate endDate, String workoutType, Pageable pageable);
}
