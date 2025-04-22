package com.lenncoder.fithub.service.impl;

import com.lenncoder.fithub.dto.GoalDto;
import com.lenncoder.fithub.entity.Goal;
import com.lenncoder.fithub.exception.ResourceNotFoundException;
import com.lenncoder.fithub.mapper.GoalMapper;
import com.lenncoder.fithub.repository.GoalRepo;
import com.lenncoder.fithub.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {


    private final GoalRepo goalRepo;
    private final GoalMapper goalMapper;


    @Override
    public GoalDto createGoal(GoalDto goalDto) {
        Goal goal = goalMapper.toEntity(goalDto);
        return goalMapper.toDto(goalRepo.save(goal));
    }

    @Override
    public GoalDto updateGoal(Long id, GoalDto goalDto) {
        Goal updatedGoal = goalRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));
        updatedGoal.setTitle(goalDto.getTitle());
        updatedGoal.setDescription(goalDto.getDescription());
        return goalMapper.toDto(goalRepo.save(updatedGoal));
    }

    @Override
    public GoalDto getGoalById(Long id) {
        Goal goal = goalRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));
        return goalMapper.toDto(goal);

    }

    @Override
    public List<GoalDto> getGoalByUserId(Long userId) {
        List<Goal> byUserId = goalRepo.findByUserId(userId);
        return byUserId.stream()
                .map(goalMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<GoalDto> getAllGoals() {
        return goalRepo.findAll()
                .stream()
                .map(goalMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteGoal(Long id) {

        Goal deletedGoal = goalRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));
        goalRepo.delete(deletedGoal);

    }
}
