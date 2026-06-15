package com.financetracker.backend.repository;

import com.financetracker.backend.model.QuestTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestTemplateRepository extends JpaRepository<QuestTemplate, Long> {
    List<QuestTemplate> findByIsSeasonalFalse();
    List<QuestTemplate> findBySeasonMonth(Integer month);
}