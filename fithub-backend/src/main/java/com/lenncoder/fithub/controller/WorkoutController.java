package com.lenncoder.fithub.controller;

import com.lenncoder.fithub.dto.WorkoutDto;
import com.lenncoder.fithub.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/workout")
@RequiredArgsConstructor
public class WorkoutController {

    private final WorkoutService workoutService;


    // Create a new workout
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<WorkoutDto> createWorkout(@RequestBody WorkoutDto workoutDto) {
        WorkoutDto createdWorkout = workoutService.createWorkout(workoutDto);
        return new ResponseEntity<>(createdWorkout, HttpStatus.CREATED);
    }


    // Update an existing workout
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<WorkoutDto> updateWorkout(@PathVariable Long id, @RequestBody WorkoutDto workoutDto) {
        WorkoutDto updatedWorkout = workoutService.updateWorkout(id, workoutDto);
        return new ResponseEntity<>(updatedWorkout, HttpStatus.OK);
    }

    // Delete a workout
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get workout by ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutDto> getWorkoutById(@PathVariable Long id) {
        WorkoutDto workout = workoutService.getWorkoutById(id);
        return new ResponseEntity<>(workout, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<WorkoutDto>> getAllWorkouts() {
        List<WorkoutDto> workouts = workoutService.getAllWorkouts();
        return new ResponseEntity<>(workouts, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<WorkoutDto>> getWorkoutsByUserId(@PathVariable Long userId) {
        List<WorkoutDto> allWorkoutsByUser = workoutService.getAllWorkoutsByUser(userId);
        return new ResponseEntity<>(allWorkoutsByUser, HttpStatus.OK);
    }



}
