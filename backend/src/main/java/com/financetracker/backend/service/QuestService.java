package com.financetracker.backend.service;

import com.financetracker.backend.dto.QuestRequestDTO;
import com.financetracker.backend.dto.QuestResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.*;
import com.financetracker.backend.repository.CharacterStateRepository;
import com.financetracker.backend.repository.QuestRepository;
import com.financetracker.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class QuestService {

    private final QuestRepository questRepository;
    private final TransactionRepository transactionRepository;
    private final CharacterStateRepository characterStateRepository;
    private final GameService gameService;

    public QuestService(QuestRepository questRepository,
                         TransactionRepository transactionRepository,
                         CharacterStateRepository characterStateRepository,
                         GameService gameService) {
        this.questRepository = questRepository;
        this.transactionRepository = transactionRepository;
        this.characterStateRepository = characterStateRepository;
        this.gameService = gameService;
    }

    /**
     * Returns all quests with up-to-date progress and status.
     * Resolves any ACTIVE quests whose period has ended (or that have
     * failed early, e.g. NO_SPEND violations) before returning.
     */
    public List<QuestResponseDTO> getAllQuests() {
        resolveActiveQuests();
        return questRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public QuestResponseDTO createQuest(QuestRequestDTO dto) {
        Quest quest = new Quest();
        applyDtoToEntity(dto, quest);
        Quest saved = questRepository.save(quest);
        return toResponseDTO(saved);
    }

    public void deleteQuest(Long id) {
        if (!questRepository.existsById(id)) {
            throw new ResourceNotFoundException("Quest not found with id: " + id);
        }
        questRepository.deleteById(id);
    }

    // --- Core resolution engine ---

    private void resolveActiveQuests() {
        List<Quest> activeQuests = questRepository.findByStatus(QuestStatus.ACTIVE);
        LocalDate today = LocalDate.now();

        for (Quest quest : activeQuests) {
            double progress = calculateProgress(quest);

            boolean periodEnded = !today.isBefore(quest.getPeriodEnd()); // today >= periodEnd
            boolean earlyFailure = checkEarlyFailure(quest, progress);

            if (earlyFailure) {
                resolveQuest(quest, QuestStatus.FAILED);
            } else if (periodEnded) {
                boolean success = checkSuccess(quest, progress);
                resolveQuest(quest, success ? QuestStatus.COMPLETED : QuestStatus.FAILED);
            }
            // else: still active, no resolution yet
        }
    }

    /**
     * NO_SPEND quests fail immediately if a disqualifying transaction
     * exists, even before period_end.
     */
    private boolean checkEarlyFailure(Quest quest, double progress) {
        if (quest.getQuestType() == QuestType.NO_SPEND) {
            return progress > 0; // any matching expense = failed
        }
        return false;
    }

    /**
     * Determines success/failure once the period has ended.
     */
    private boolean checkSuccess(Quest quest, double progress) {
        switch (quest.getQuestType()) {
            case SPENDING_LIMIT:
                return progress <= quest.getTargetAmount();
            case SAVINGS_TARGET:
                return progress >= quest.getTargetAmount();
            case NO_SPEND:
                return progress == 0;
            case STREAK:
                // Placeholder: STREAK quests are resolved by future logic (Phase 8)
                return false;
            default:
                return false;
        }
    }

    /**
     * Calculates current progress for a quest based on its type.
     */
    private double calculateProgress(Quest quest) {
        switch (quest.getQuestType()) {
            case SPENDING_LIMIT:
                return sumTransactions(TransactionType.EXPENSE, quest.getCategory(),
                        quest.getPeriodStart(), quest.getPeriodEnd());

            case SAVINGS_TARGET:
                double income = sumTransactions(TransactionType.INCOME, null,
                        quest.getPeriodStart(), quest.getPeriodEnd());
                double expenses = sumTransactions(TransactionType.EXPENSE, null,
                        quest.getPeriodStart(), quest.getPeriodEnd());
                return income - expenses;

            case NO_SPEND:
                return sumTransactions(TransactionType.EXPENSE, quest.getCategory(),
                        quest.getPeriodStart(), quest.getPeriodEnd());

            case STREAK:
                return 0; // Placeholder for Phase 8

            default:
                return 0;
        }
    }

    private double sumTransactions(TransactionType type, String category, LocalDate start, LocalDate end) {
        return transactionRepository.findAll().stream()
                .filter(t -> t.getType() == type)
                .filter(t -> category == null || category.equalsIgnoreCase(t.getCategory()))
                .filter(t -> !t.getDate().isBefore(start) && !t.getDate().isAfter(end))
                .mapToDouble(t -> t.getAmount())
                .sum();
    }

    /**
     * Applies the resolution: sets status, resolvedAt, and triggers
     * XP/HP rewards exactly once.
     */
    private void resolveQuest(Quest quest, QuestStatus result) {
        quest.setStatus(result);
        quest.setResolvedAt(java.time.LocalDateTime.now());
        questRepository.save(quest);

        if (result == QuestStatus.COMPLETED) {
            if (quest.getXpReward() > 0) {
                gameService.awardXp(quest.getXpReward(), "QUEST_COMPLETE", quest.getId());
            }
            applyHpChange(quest.getHpReward());
        } else if (result == QuestStatus.FAILED) {
            applyHpChange(-quest.getHpPenalty());
        }
    }

    private void applyHpChange(int delta) {
        if (delta == 0) return;

        CharacterState character = characterStateRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> {
                    CharacterState newState = new CharacterState();
                    newState.setCurrentHp(100);
                    return characterStateRepository.save(newState);
                });

        int newHp = character.getCurrentHp() + delta;
        newHp = Math.max(0, newHp); // floor at 0; ceiling vs maxHp handled by GameService display
        character.setCurrentHp(newHp);
        characterStateRepository.save(character);
    }

    // --- Mapping helpers ---

    private void applyDtoToEntity(QuestRequestDTO dto, Quest quest) {
        quest.setName(dto.getName());
        quest.setDescription(dto.getDescription());
        quest.setQuestType(dto.getQuestType());
        quest.setCategory(dto.getCategory());
        quest.setTargetAmount(dto.getTargetAmount());
        quest.setPeriod(dto.getPeriod());
        quest.setPeriodStart(dto.getPeriodStart());
        quest.setPeriodEnd(dto.getPeriodEnd());
        quest.setXpReward(dto.getXpReward());
        quest.setHpReward(dto.getHpReward());
        quest.setHpPenalty(dto.getHpPenalty());
    }

    private QuestResponseDTO toResponseDTO(Quest quest) {
        double progress = calculateProgress(quest);

        return new QuestResponseDTO(
                quest.getId(),
                quest.getName(),
                quest.getDescription(),
                quest.getQuestType(),
                quest.getCategory(),
                quest.getTargetAmount(),
                progress,
                quest.getPeriod(),
                quest.getPeriodStart(),
                quest.getPeriodEnd(),
                quest.getXpReward(),
                quest.getHpReward(),
                quest.getHpPenalty(),
                quest.getStatus(),
                quest.getIsSeasonal()
        );
    }
}