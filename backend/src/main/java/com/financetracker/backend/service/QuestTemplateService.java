package com.financetracker.backend.service;

import com.financetracker.backend.dto.QuestRequestDTO;
import com.financetracker.backend.dto.QuestResponseDTO;
import com.financetracker.backend.dto.QuestTemplateResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.QuestTemplate;
import com.financetracker.backend.repository.QuestTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestTemplateService {

    private final QuestTemplateRepository questTemplateRepository;
    private final QuestService questService;

    public QuestTemplateService(QuestTemplateRepository questTemplateRepository,
                                 QuestService questService) {
        this.questTemplateRepository = questTemplateRepository;
        this.questService = questService;
    }

    public List<QuestTemplateResponseDTO> getAllTemplates() {
        int currentMonth = LocalDate.now().getMonthValue();
        List<QuestTemplate> regular = questTemplateRepository.findByIsSeasonalFalse();
        List<QuestTemplate> seasonal = questTemplateRepository.findBySeasonMonth(currentMonth);

        List<QuestTemplateResponseDTO> result = new ArrayList<>();
        seasonal.stream().map(this::toResponseDTO).forEach(result::add);
        regular.stream().map(this::toResponseDTO).forEach(result::add);
        return result;
    }

    public QuestResponseDTO activateTemplate(Long templateId, QuestRequestDTO dto) {
        QuestTemplate template = questTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found with id: " + templateId));

        // Override with template defaults if user didn't change them
        if (dto.getHpReward() == null || dto.getHpReward() == 0) {
            dto.setHpReward(template.getHpReward());
        }
        if (dto.getHpPenalty() == null || dto.getHpPenalty() == 0) {
            dto.setHpPenalty(template.getHpPenalty());
        }

        QuestResponseDTO created = questService.createQuest(dto);
        return created;
    }

    private QuestTemplateResponseDTO toResponseDTO(QuestTemplate template) {
        return new QuestTemplateResponseDTO(
                template.getId(),
                template.getName(),
                template.getDescription(),
                template.getQuestType(),
                template.getCategory(),
                template.getSuggestedTarget(),
                template.getSuggestedPeriod(),
                template.getHpReward(),
                template.getHpPenalty(),
                template.getIsSeasonal(),
                template.getSeasonMonth()
        );
    }
}