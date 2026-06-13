package com.financetracker.backend.repository;

import com.financetracker.backend.model.XpLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XpLogRepository extends JpaRepository<XpLog, Long> {
}