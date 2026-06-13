package com.financetracker.backend.repository;

import com.financetracker.backend.model.Quest;
import com.financetracker.backend.model.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    List<Quest> findByStatus(QuestStatus status);
}