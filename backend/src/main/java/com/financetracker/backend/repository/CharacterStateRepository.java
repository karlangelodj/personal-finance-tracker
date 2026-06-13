package com.financetracker.backend.repository;

import com.financetracker.backend.model.CharacterState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterStateRepository extends JpaRepository<CharacterState, Long> {
}