package com.lenncoder.fithub.repository;

import com.lenncoder.fithub.entity.Workout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepo extends JpaRepository<Workout, Long> {

    List<Workout> findByUserId(Long userId);

    // Custom query for filtering by userId, date range and workout type
    Page<Workout> findByUserIdAndCreatedAtBetweenAndWorkoutType(
            Long userId, LocalDate startDate, LocalDate endDate, String workoutType, Pageable pageable);
}
