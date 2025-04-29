package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.config.user.CustomUserDetails;
import com.lenncoder.fithub.dto.ExerciseDto;
import com.lenncoder.fithub.entity.Exercise;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.ExerciseMapper;
import com.lenncoder.fithub.repository.ExerciseRepo;
import com.lenncoder.fithub.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepo exerciseRepo;
    private final ExerciseMapper exerciseMapper;

    @Override
    public ExerciseDto createExercise(ExerciseDto exerciseDto) {
        Exercise exercise = exerciseMapper.toEntity(exerciseDto);

        // Get the currently authenticated user from the SecurityContext
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Get the userId from CustomUserDetails
        Long userId = customUserDetails.getId();

        // Set the userId on the workout object
        exercise.setUserId(userId);

        return exerciseMapper.toDto(exerciseRepo.save(exercise));
    }

    @Override
    public ExerciseDto updateExercise(Long id, ExerciseDto exerciseDto) {
        Exercise updatedExercise = exerciseRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id " + id));
        updatedExercise.setName(exerciseDto.getName());
        updatedExercise.setDescription(exerciseDto.getDescription());
        updatedExercise.setSets(exerciseDto.getSets());
        updatedExercise.setRepetitions(exerciseDto.getRepetitions());
        updatedExercise.setDurationInMinutes(exerciseDto.getDurationInMinutes());
        updatedExercise.setTargetMuscle(exerciseDto.getTargetMuscle());
        updatedExercise.setEquipment(exerciseDto.getEquipment());
        updatedExercise.setWorkoutId(exerciseDto.getWorkoutId());
        return exerciseMapper.toDto(exerciseRepo.save(updatedExercise));
    }

    @Override
    public ExerciseDto getExerciseById(Long id) {
        Exercise exercise = exerciseRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id " + id));
        return exerciseMapper.toDto(exercise);
    }

    @Override
    public List<ExerciseDto> getAllExercises() {

        List<Exercise> exercises = exerciseRepo.findAll();
        return exercises.stream()
                .map(exerciseMapper::toDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<ExerciseDto> getExerciseByWorkoutId(Long workoutId) {
        List<Exercise> byWorkoutId = exerciseRepo.findByWorkoutId(workoutId);
        return byWorkoutId.stream()
                .map(exerciseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExerciseDto> getExerciseByUserId(Long userId) {
        return exerciseRepo.findByUserId(userId)
                .stream()
                .map(exerciseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteExercise(Long id) {
        Exercise deletedExercise = exerciseRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id " + id));
        exerciseRepo.delete(deletedExercise);

    }
}
