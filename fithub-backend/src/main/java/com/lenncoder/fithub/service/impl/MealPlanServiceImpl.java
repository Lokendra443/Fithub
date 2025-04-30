package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.config.user.CustomUserDetails;
import com.lenncoder.fithub.dto.MealPlanDto;
import com.lenncoder.fithub.entity.MealPlan;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.MealPlanMapper;
import com.lenncoder.fithub.repository.MealPlanRepo;
import com.lenncoder.fithub.service.MealPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealPlanServiceImpl implements MealPlanService {

    private final MealPlanRepo mealPlanRepo;
    private final MealPlanMapper mealPlanMapper;


    @Override
    public MealPlanDto createMealPlan(MealPlanDto mealPlanDto) {
        MealPlan mealPlan = mealPlanMapper.toEntity(mealPlanDto);

        // Get the currently authenticated user from the SecurityContext
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Get the userId from CustomUserDetails
        Long userId = customUserDetails.getId();

        // Set the userId on the workout object
        mealPlan.setUserId(userId);


        return mealPlanMapper.toDto(mealPlanRepo.save(mealPlan));

    }

    @Override
    public MealPlanDto updateMealPlan(Long id, MealPlanDto mealPlanDto) {

        MealPlan updatedMealPlan = mealPlanRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("MealPlan not found with id: " + id));
        updatedMealPlan.setName(mealPlanDto.getName());
        updatedMealPlan.setDescription(mealPlanDto.getDescription());
        updatedMealPlan.setProtein(mealPlanDto.getProtein());
        updatedMealPlan.setCalories(mealPlanDto.getCalories());
        updatedMealPlan.setCarbs(mealPlanDto.getCarbs());
        updatedMealPlan.setFat(mealPlanDto.getFat());
        return mealPlanMapper.toDto(mealPlanRepo.save(updatedMealPlan));
    }

    @Override
    public MealPlanDto getMealPlanById(Long id) {
        MealPlan mealPlan = mealPlanRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("MealPlan not found with id: " + id));
        return mealPlanMapper.toDto(mealPlan);
    }

    @Override
    public List<MealPlanDto> getMealPlanByUserId(Long userId) {
        return mealPlanRepo.findByUserId(userId)
                .stream()
                .map(mealPlanMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MealPlanDto> getAllMealPlan() {
        return mealPlanRepo.findAll()
                .stream()
                .map(mealPlanMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMealPlan(Long id) {
        MealPlan deletedMealPlan = mealPlanRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("MealPlan not found with id: " + id));
        mealPlanRepo.delete(deletedMealPlan);

    }
}
