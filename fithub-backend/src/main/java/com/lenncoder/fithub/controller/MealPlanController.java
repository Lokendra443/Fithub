package com.lenncoder.fithub.controller;

import com.lenncoder.fithub.dto.MealPlanDto;
import com.lenncoder.fithub.service.MealPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meal-plan")
@RequiredArgsConstructor
public class MealPlanController {

    private final MealPlanService mealPlanService;


    @PostMapping("/create")
    public ResponseEntity<MealPlanDto> createMealPlan(@RequestBody MealPlanDto mealPlanDto) {
        MealPlanDto mealPlan = mealPlanService.createMealPlan(mealPlanDto);
        return new ResponseEntity<>(mealPlan, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MealPlanDto> updateMealPlan(@PathVariable Long id, @RequestBody MealPlanDto mealPlanDto) {
        MealPlanDto mealPlan = mealPlanService.updateMealPlan(id, mealPlanDto);
        return new ResponseEntity<>(mealPlan, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlanDto> getMealPlanById(@PathVariable Long id) {
        MealPlanDto mealPlan = mealPlanService.getMealPlanById(id);
        return new ResponseEntity<>(mealPlan, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MealPlanDto>> getMealPlanByUserId(@PathVariable Long userId) {
        List<MealPlanDto> mealPlanByUserId = mealPlanService.getMealPlanByUserId(userId);
        return new ResponseEntity<>(mealPlanByUserId, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MealPlanDto>> getAllMealPlans() {
        List<MealPlanDto> allMealPlan = mealPlanService.getAllMealPlan();
        return new ResponseEntity<>(allMealPlan, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        mealPlanService.deleteMealPlan(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
