package com.financetracker.backend.dto;

import com.financetracker.backend.model.QuestPeriod;
import com.financetracker.backend.model.QuestStatus;
import com.financetracker.backend.model.QuestType;
import java.time.LocalDate;

public class QuestResponseDTO {

    private Long id;
    private String name;
    private String description;
    private QuestType questType;
    private String category;
    private Double targetAmount;
    private Double progress;
    private QuestPeriod period;
    private LocalDate periodStart;
    private LocalDate periodEnd;
    private Integer xpReward;
    private Integer hpReward;
    private Integer hpPenalty;
    private QuestStatus status;
    private Boolean isSeasonal;

    public QuestResponseDTO(Long id, String name, String description, QuestType questType,
                             String category, Double targetAmount, Double progress,
                             QuestPeriod period, LocalDate periodStart, LocalDate periodEnd,
                             Integer xpReward, Integer hpReward, Integer hpPenalty,
                             QuestStatus status, Boolean isSeasonal) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questType = questType;
        this.category = category;
        this.targetAmount = targetAmount;
        this.progress = progress;
        this.period = period;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.xpReward = xpReward;
        this.hpReward = hpReward;
        this.hpPenalty = hpPenalty;
        this.status = status;
        this.isSeasonal = isSeasonal;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public QuestType getQuestType() { return questType; }
    public String getCategory() { return category; }
    public Double getTargetAmount() { return targetAmount; }
    public Double getProgress() { return progress; }
    public QuestPeriod getPeriod() { return period; }
    public LocalDate getPeriodStart() { return periodStart; }
    public LocalDate getPeriodEnd() { return periodEnd; }
    public Integer getXpReward() { return xpReward; }
    public Integer getHpReward() { return hpReward; }
    public Integer getHpPenalty() { return hpPenalty; }
    public QuestStatus getStatus() { return status; }
    public Boolean getIsSeasonal() { return isSeasonal; }
}