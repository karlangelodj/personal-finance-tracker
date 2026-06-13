package com.financetracker.backend.dto;

import com.financetracker.backend.model.QuestPeriod;
import com.financetracker.backend.model.QuestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

public class QuestRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "Quest type is required")
    private QuestType questType;

    private String category;

    private Double targetAmount;

    @NotNull(message = "Period is required")
    private QuestPeriod period;

    @NotNull(message = "Period start is required")
    private LocalDate periodStart;

    @NotNull(message = "Period end is required")
    private LocalDate periodEnd;

    @PositiveOrZero(message = "XP reward cannot be negative")
    private Integer xpReward = 0;

    @PositiveOrZero(message = "HP reward cannot be negative")
    private Integer hpReward = 0;

    @PositiveOrZero(message = "HP penalty cannot be negative")
    private Integer hpPenalty = 0;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public QuestType getQuestType() { return questType; }
    public void setQuestType(QuestType questType) { this.questType = questType; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getTargetAmount() { return targetAmount; }
    public void setTargetAmount(Double targetAmount) { this.targetAmount = targetAmount; }

    public QuestPeriod getPeriod() { return period; }
    public void setPeriod(QuestPeriod period) { this.period = period; }

    public LocalDate getPeriodStart() { return periodStart; }
    public void setPeriodStart(LocalDate periodStart) { this.periodStart = periodStart; }

    public LocalDate getPeriodEnd() { return periodEnd; }
    public void setPeriodEnd(LocalDate periodEnd) { this.periodEnd = periodEnd; }

    public Integer getXpReward() { return xpReward; }
    public void setXpReward(Integer xpReward) { this.xpReward = xpReward; }

    public Integer getHpReward() { return hpReward; }
    public void setHpReward(Integer hpReward) { this.hpReward = hpReward; }

    public Integer getHpPenalty() { return hpPenalty; }
    public void setHpPenalty(Integer hpPenalty) { this.hpPenalty = hpPenalty; }
}