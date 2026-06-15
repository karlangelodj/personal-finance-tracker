package com.financetracker.backend.dto;

import com.financetracker.backend.model.GoalStatus;
import com.financetracker.backend.model.GoalType;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class GoalResponseDTO {

    private Long id;
    private String name;
    private String description;
    private GoalType goalType;
    private Double targetAmount;
    private Double currentAmount;
    private Double progressPercent;
    private Double remaining;
    private LocalDate deadline;
    private boolean isOverdue;
    private Integer hpReward;
    private GoalStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public GoalResponseDTO(Long id, String name, String description, GoalType goalType,
                            Double targetAmount, Double currentAmount, Double progressPercent,
                            Double remaining, LocalDate deadline, boolean isOverdue,
                            Integer hpReward, GoalStatus status,
                            LocalDateTime createdAt, LocalDateTime completedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.goalType = goalType;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.progressPercent = progressPercent;
        this.remaining = remaining;
        this.deadline = deadline;
        this.isOverdue = isOverdue;
        this.hpReward = hpReward;
        this.status = status;
        this.createdAt = createdAt;
        this.completedAt = completedAt;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public GoalType getGoalType() { return goalType; }
    public Double getTargetAmount() { return targetAmount; }
    public Double getCurrentAmount() { return currentAmount; }
    public Double getProgressPercent() { return progressPercent; }
    public Double getRemaining() { return remaining; }
    public LocalDate getDeadline() { return deadline; }
    public boolean isOverdue() { return isOverdue; }
    public Integer getHpReward() { return hpReward; }
    public GoalStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getCompletedAt() { return completedAt; }
}