package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.config.user.CustomUserDetails;
import com.lenncoder.fithub.dto.WorkoutDto;
import com.lenncoder.fithub.entity.Workout;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.WorkoutMapper;
import com.lenncoder.fithub.repository.UserRepo;
import com.lenncoder.fithub.repository.WorkoutRepo;
import com.lenncoder.fithub.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepo workoutRepo;
    private final UserRepo userRepo;

    private final WorkoutMapper workoutMapper;


    @Override
    public WorkoutDto createWorkout(WorkoutDto workoutDto) {
        Workout workout = workoutMapper.toEntity(workoutDto);

        // Get the currently authenticated user from the SecurityContext
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Get the userId from CustomUserDetails
        Long userId = customUserDetails.getId();

        // Set the userId on the workout object
        workout.setUserId(userId);

        Workout savedWorkout = workoutRepo.save(workout);
        return workoutMapper.toDto(savedWorkout);

    }

    @Override
    public WorkoutDto updateWorkout(Long id, WorkoutDto workoutDto) {
        Workout updatedWorkout = workoutRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Workout not found with id " + id));
        updatedWorkout.setTitle(workoutDto.getTitle());
        updatedWorkout.setDescription(workoutDto.getDescription());
        updatedWorkout.setWorkoutType(workoutDto.getWorkoutType());
        updatedWorkout.setIntensity(workoutDto.getIntensity());
        updatedWorkout.setDuration(workoutDto.getDuration());
        updatedWorkout.setCaloriesBurned(workoutDto.getCaloriesBurned());

        return workoutMapper.toDto(workoutRepo.save(updatedWorkout));
    }

    @Override
    public void deleteWorkout(Long id) {
        Workout deletedWorkout = workoutRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Workout not found with id " + id));
        workoutRepo.delete(deletedWorkout);

    }

    @Override
    public WorkoutDto getWorkoutById(Long id) {
        Workout workout = workoutRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Workout not found with id " + id));

        return workoutMapper.toDto(workout);
    }

    @Override
    public List<WorkoutDto> getAllWorkouts() {
        List<Workout> allWorkouts = workoutRepo.findAll();
        return allWorkouts.stream().map(workoutMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<WorkoutDto> getAllWorkoutsByUser(Long userId) {
        List<Workout> workouts = workoutRepo.findByUserId(userId);
        return workouts.stream()
                .map(workoutMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<WorkoutDto> getWorkoutsByFilters(Long userId, LocalDate startDate, LocalDate endDate, String workoutType, Pageable pageable) {
        Page<Workout> workoutPage = workoutRepo.findByUserIdAndCreatedAtBetweenAndWorkoutType(userId, startDate, endDate, workoutType, pageable);
        return workoutPage.map(workoutMapper::toDto);
    }
}
