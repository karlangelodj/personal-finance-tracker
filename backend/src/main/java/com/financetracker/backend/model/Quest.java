package com.financetracker.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "quests")
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "quest_type", nullable = false)
    private QuestType questType;

    private String category;

    @Column(name = "target_amount")
    private Double targetAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestPeriod period;

    @Column(name = "period_start", nullable = false)
    private LocalDate periodStart;

    @Column(name = "period_end", nullable = false)
    private LocalDate periodEnd;

    @Column(name = "xp_reward", nullable = false)
    private Integer xpReward = 0;

    @Column(name = "hp_reward", nullable = false)
    private Integer hpReward = 0;

    @Column(name = "hp_penalty", nullable = false)
    private Integer hpPenalty = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestStatus status = QuestStatus.ACTIVE;

    @Column(name = "is_seasonal", nullable = false)
    private Boolean isSeasonal = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public QuestStatus getStatus() { return status; }
    public void setStatus(QuestStatus status) { this.status = status; }

    public Boolean getIsSeasonal() { return isSeasonal; }
    public void setIsSeasonal(Boolean isSeasonal) { this.isSeasonal = isSeasonal; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}