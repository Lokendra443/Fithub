package com.lenncoder.fithub.repository;

import com.lenncoder.fithub.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepo extends JpaRepository<Exercise, Long> {

    List<Exercise> findByWorkoutId(Long workoutId);
}
