package com.financetracker.backend.dto;

import com.financetracker.backend.model.GoalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

public class GoalRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "Goal type is required")
    private GoalType goalType;

    @NotNull(message = "Target amount is required")
    @Positive(message = "Target amount must be greater than 0")
    private Double targetAmount;

    private LocalDate deadline;

    @PositiveOrZero(message = "HP reward cannot be negative")
    private Integer hpReward = 10;

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public GoalType getGoalType() { return goalType; }
    public void setGoalType(GoalType goalType) { this.goalType = goalType; }

    public Double getTargetAmount() { return targetAmount; }
    public void setTargetAmount(Double targetAmount) { this.targetAmount = targetAmount; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }

    public Integer getHpReward() { return hpReward; }
    public void setHpReward(Integer hpReward) { this.hpReward = hpReward; }
}