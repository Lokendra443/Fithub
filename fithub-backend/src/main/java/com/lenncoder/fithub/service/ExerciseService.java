package com.lenncoder.fithub.service;

import com.lenncoder.fithub.dto.ExerciseDto;

import java.util.List;

public interface ExerciseService {

    ExerciseDto createExercise(ExerciseDto exerciseDto);
    ExerciseDto updateExercise(Long id, ExerciseDto exerciseDto);
    ExerciseDto getExerciseById(Long id);
    List<ExerciseDto> getAllExercises();
    List<ExerciseDto> getExerciseByWorkoutId(Long workoutId);
    void deleteExercise(Long id);
}
