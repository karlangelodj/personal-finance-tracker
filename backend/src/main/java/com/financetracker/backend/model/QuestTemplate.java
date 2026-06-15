package com.financetracker.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quest_templates")
public class QuestTemplate {

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

    @Column(name = "suggested_target")
    private Double suggestedTarget;

    @Enumerated(EnumType.STRING)
    @Column(name = "suggested_period", nullable = false)
    private QuestPeriod suggestedPeriod;

    @Column(name = "hp_reward", nullable = false)
    private Integer hpReward = 10;

    @Column(name = "hp_penalty", nullable = false)
    private Integer hpPenalty = 10;

    @Column(name = "is_seasonal", nullable = false)
    private Boolean isSeasonal = false;

    @Column(name = "season_month")
    private Integer seasonMonth;

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

    public Double getSuggestedTarget() { return suggestedTarget; }
    public void setSuggestedTarget(Double suggestedTarget) { this.suggestedTarget = suggestedTarget; }

    public QuestPeriod getSuggestedPeriod() { return suggestedPeriod; }
    public void setSuggestedPeriod(QuestPeriod suggestedPeriod) { this.suggestedPeriod = suggestedPeriod; }

    public Integer getHpReward() { return hpReward; }
    public void setHpReward(Integer hpReward) { this.hpReward = hpReward; }

    public Integer getHpPenalty() { return hpPenalty; }
    public void setHpPenalty(Integer hpPenalty) { this.hpPenalty = hpPenalty; }

    public Boolean getIsSeasonal() { return isSeasonal; }
    public void setIsSeasonal(Boolean isSeasonal) { this.isSeasonal = isSeasonal; }

    public Integer getSeasonMonth() { return seasonMonth; }
    public void setSeasonMonth(Integer seasonMonth) { this.seasonMonth = seasonMonth; }
}