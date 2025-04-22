package com.lenncoder.fithub.repository;

import com.lenncoder.fithub.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepo extends JpaRepository<Goal, Long> {

    List<Goal> findByUserId(Long userId);
}
