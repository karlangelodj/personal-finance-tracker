package com.financetracker.backend.service;

import com.financetracker.backend.dto.ContributionRequestDTO;
import com.financetracker.backend.dto.GoalRequestDTO;
import com.financetracker.backend.dto.GoalResponseDTO;
import com.financetracker.backend.exception.ResourceNotFoundException;
import com.financetracker.backend.model.CharacterState;
import com.financetracker.backend.model.Goal;
import com.financetracker.backend.model.GoalStatus;
import com.financetracker.backend.repository.CharacterStateRepository;
import com.financetracker.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final CharacterStateRepository characterStateRepository;
    private final GameService gameService;

    public GoalService(GoalRepository goalRepository,
                       CharacterStateRepository characterStateRepository,
                       GameService gameService) {
        this.goalRepository = goalRepository;
        this.characterStateRepository = characterStateRepository;
        this.gameService = gameService;
    }

    public List<GoalResponseDTO> getAllGoals() {
        return goalRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public GoalResponseDTO getGoalById(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));
        return toResponseDTO(goal);
    }

    public GoalResponseDTO createGoal(GoalRequestDTO dto) {
        Goal goal = new Goal();
        applyDtoToEntity(dto, goal);
        Goal saved = goalRepository.save(goal);
        return toResponseDTO(saved);
    }

    public GoalResponseDTO contribute(Long id, ContributionRequestDTO dto) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));

        if (goal.getStatus() != GoalStatus.ACTIVE) {
            throw new IllegalStateException("Cannot contribute to a " + goal.getStatus() + " goal");
        }

        // Add contribution
        double newAmount = goal.getCurrentAmount() + dto.getAmount();
        goal.setCurrentAmount(newAmount);

        // Check completion
        if (newAmount >= goal.getTargetAmount()) {
            goal.setCurrentAmount(goal.getTargetAmount()); // cap at target
            goal.setStatus(GoalStatus.COMPLETED);
            goal.setCompletedAt(LocalDateTime.now());
            applyHpReward(goal.getHpReward());
        }

        Goal saved = goalRepository.save(goal);
        return toResponseDTO(saved);
    }

    public GoalResponseDTO abandonGoal(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found with id: " + id));

        if (goal.getStatus() != GoalStatus.ACTIVE) {
            throw new IllegalStateException("Only active goals can be abandoned");
        }

        goal.setStatus(GoalStatus.ABANDONED);
        Goal saved = goalRepository.save(goal);
        return toResponseDTO(saved);
    }

    public void deleteGoal(Long id) {
        if (!goalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Goal not found with id: " + id);
        }
        goalRepository.deleteById(id);
    }

    // --- Helper methods ---

    private void applyHpReward(int reward) {
        if (reward <= 0) return;

        CharacterState character = gameService.getOrCreateCharacterState();
        int newHp = Math.min(character.getCurrentHp() + reward, 100);
        character.setCurrentHp(newHp);
        characterStateRepository.save(character);
    }

    private void applyDtoToEntity(GoalRequestDTO dto, Goal goal) {
        goal.setName(dto.getName());
        goal.setDescription(dto.getDescription());
        goal.setGoalType(dto.getGoalType());
        goal.setTargetAmount(dto.getTargetAmount());
        goal.setDeadline(dto.getDeadline());
        goal.setHpReward(dto.getHpReward() != null ? dto.getHpReward() : 10);
    }

    private GoalResponseDTO toResponseDTO(Goal goal) {
        double progressPercent = (goal.getCurrentAmount() / goal.getTargetAmount()) * 100;
        double remaining = goal.getTargetAmount() - goal.getCurrentAmount();
        boolean isOverdue = goal.getStatus() == GoalStatus.ACTIVE
                && goal.getDeadline() != null
                && LocalDate.now().isAfter(goal.getDeadline());

        return new GoalResponseDTO(
                goal.getId(),
                goal.getName(),
                goal.getDescription(),
                goal.getGoalType(),
                goal.getTargetAmount(),
                goal.getCurrentAmount(),
                Math.min(progressPercent, 100.0),
                Math.max(remaining, 0.0),
                goal.getDeadline(),
                isOverdue,
                goal.getHpReward(),
                goal.getStatus(),
                goal.getCreatedAt(),
                goal.getCompletedAt()
        );
    }
}