package com.lenncoder.fithub.controller;

import com.lenncoder.fithub.dto.ExerciseDto;
import com.lenncoder.fithub.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercise")
@RequiredArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping("/create")
    public ResponseEntity<ExerciseDto> createExercise(@RequestBody ExerciseDto exerciseDto) {
        ExerciseDto createdExercise = exerciseService.createExercise(exerciseDto);
        return new ResponseEntity<>(createdExercise, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ExerciseDto> updateExercise(@RequestBody ExerciseDto exerciseDto, @PathVariable Long id) {
        ExerciseDto updatedExercise = exerciseService.updateExercise(id, exerciseDto);
        return new ResponseEntity<>(updatedExercise, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDto> getExerciseById(@PathVariable Long id) {
        ExerciseDto exercise = exerciseService.getExerciseById(id);
        return new ResponseEntity<>(exercise, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExerciseDto>> getAllExercises() {
        List<ExerciseDto> exercises = exerciseService.getAllExercises();
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @GetMapping("/workout/{workoutId}")
    public ResponseEntity<List<ExerciseDto>> getExerciseByWorkoutId(@PathVariable Long workoutId) {
        List<ExerciseDto> exercises = exerciseService.getExerciseByWorkoutId(workoutId);
        return new ResponseEntity<>(exercises, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExerciseById(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
