package com.financetracker.backend.repository;

import com.financetracker.backend.model.Goal;
import com.financetracker.backend.model.GoalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByStatus(GoalStatus status);
}