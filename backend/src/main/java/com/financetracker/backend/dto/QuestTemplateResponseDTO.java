package com.financetracker.backend.dto;

import com.financetracker.backend.model.QuestPeriod;
import com.financetracker.backend.model.QuestType;

public class QuestTemplateResponseDTO {

    private Long id;
    private String name;
    private String description;
    private QuestType questType;
    private String category;
    private Double suggestedTarget;
    private QuestPeriod suggestedPeriod;
    private Integer hpReward;
    private Integer hpPenalty;
    private Boolean isSeasonal;
    private Integer seasonMonth;

    public QuestTemplateResponseDTO(Long id, String name, String description,
                                     QuestType questType, String category,
                                     Double suggestedTarget, QuestPeriod suggestedPeriod,
                                     Integer hpReward, Integer hpPenalty,
                                     Boolean isSeasonal, Integer seasonMonth) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.questType = questType;
        this.category = category;
        this.suggestedTarget = suggestedTarget;
        this.suggestedPeriod = suggestedPeriod;
        this.hpReward = hpReward;
        this.hpPenalty = hpPenalty;
        this.isSeasonal = isSeasonal;
        this.seasonMonth = seasonMonth;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public QuestType getQuestType() { return questType; }
    public String getCategory() { return category; }
    public Double getSuggestedTarget() { return suggestedTarget; }
    public QuestPeriod getSuggestedPeriod() { return suggestedPeriod; }
    public Integer getHpReward() { return hpReward; }
    public Integer getHpPenalty() { return hpPenalty; }
    public Boolean getIsSeasonal() { return isSeasonal; }
    public Integer getSeasonMonth() { return seasonMonth; }
}