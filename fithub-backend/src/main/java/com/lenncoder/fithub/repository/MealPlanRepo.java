package com.lenncoder.fithub.repository;

import com.lenncoder.fithub.entity.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealPlanRepo extends JpaRepository<MealPlan, Long> {

    List<MealPlan> findByUserId(Long userId);
}
