package com.lenncoder.fithub.controller;

import com.lenncoder.fithub.dto.GoalDto;
import com.lenncoder.fithub.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goal")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/create")
    public ResponseEntity<GoalDto> createGoal(@RequestBody GoalDto goalDto) {
        GoalDto createdGoal = goalService.createGoal(goalDto);
        return new ResponseEntity<>(createdGoal, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto) {
        GoalDto updatedGoal = goalService.updateGoal(id, goalDto);
        return new ResponseEntity<>(updatedGoal, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<GoalDto> getGoalById(@PathVariable Long id) {
        GoalDto goalById = goalService.getGoalById(id);
        return new ResponseEntity<>(goalById, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GoalDto>> getGoalByUserId(@PathVariable Long userId) {
        List<GoalDto> goalByUserId = goalService.getGoalByUserId(userId);
        return new ResponseEntity<>(goalByUserId, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GoalDto>> getAllGaols(){
        List<GoalDto> allGoals = goalService.getAllGoals();
        return new ResponseEntity<>(allGoals, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
